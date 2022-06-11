// Imports the Google Analytics Data API client library.
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import groq from 'groq';
import { startsWith } from 'lodash-es';
import { Picture } from '~/lib/groq/picture.partial.groq';
import { log } from '~/lib/log';
import { sanityClient } from '~/lib/sanityio';

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY,
  },
});

const GA_PROPERTY_ID = '311007044';

async function getGaTopPages() {
  // `runReport` docs https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${GA_PROPERTY_ID}`,

    dimensions: [{ name: 'pagePath' }],

    dimensionFilter: {
      filter: {
        fieldName: 'pageReferrer',
        stringFilter: {
          matchType: 'ENDS_WITH',
          value: '~search',
          caseSensitive: false,
        },
      },
    },

    metrics: [
      {
        name: 'screenPageViews',
      },
    ],

    limit: 25,

    dateRanges: [
      {
        startDate: '14daysAgo',
        endDate: 'today',
      },
    ],
  });

  if (!response || !response.rows) {
    log('error', 'no trending celebs found', [], response as any);

    return null;
  }

  const pages: any[] = [];

  for (let i = 0; response.rows.length > i; i++) {
    const row = response.rows[i];
    const dimensionValues = row.dimensionValues;

    if (!dimensionValues) {
      continue;
    }

    const path = dimensionValues[0].value;

    if (!path || path === '/' || startsWith(path, '/~')) {
      continue;
    }

    pages.push(path.substring(1, path.length));
  }

  return pages;
}

export type TrendingCelebs = { name: string; slug: string; picture: Picture }[];

export async function getTrendingCelebs() {
  const gaTopPages = (await getGaTopPages()) as string[];

  const trendingCelebs = await sanityClient.fetch(
    'trending-celebs',
    groq`*[
      _type == 'celeb' &&
      slug.current in $slugs
    ] {
      name,
      'slug': slug.current,
      'picture': picture.asset->{_id, 'metadata': {'lqip': metadata.lqip, 'palette': metadata.palette}},
    }
    `,
    { slugs: gaTopPages },
  );

  trendingCelebs.sort((a: any, b: any) => {
    return gaTopPages.indexOf(a.slug) - gaTopPages.indexOf(b.slug);
  });

  return trendingCelebs as TrendingCelebs;
}
