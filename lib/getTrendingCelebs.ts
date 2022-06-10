// Imports the Google Analytics Data API client library.
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import groq from 'groq';
import { startsWith } from 'lodash-es';
import { Picture } from '~/lib/groq/picture.partial.groq';
import { GA_TRACKING_ID } from '~/lib/gtag';
import { log } from '~/lib/log';
import { sanityClient } from '~/lib/sanityio';

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY,
  },
});

const reportDefinition = {
  property: `properties/${GA_TRACKING_ID}`,
  dimensions: [{ name: 'pagePath' }],
  metrics: [
    {
      name: 'screenPageViews',
    },
  ],
  limit: 25,
};

async function getGaTopPages() {
  // `runReport` docs https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport
  const [response] = await analyticsDataClient.runReport({
    ...reportDefinition,
    dateRanges: [
      {
        startDate: '7daysAgo',
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
  const gaTopPages = await getGaTopPages();

  const trendingCelebs = await sanityClient.fetch(
    'trending-celebs',
    groq`*[
      _type == 'celeb' &&
      slug.current in $slugs
    ] {
      name,
      'slug': slug.current,
      'picture': picture.asset->{_id, 'metadata': {'lqip': metadata.lqip, 'palette': metadata.palette}},
      "latestFact": *[
        _type == "fact" &&
        celeb._ref == ^._id
      ] | order(_updatedAt desc)[0]
    } | order(latestFact._updatedAt desc){
      name,
      picture,
      slug,
      latestFact
    }
    `,
    { slugs: gaTopPages },
  );

  trendingCelebs.sort((a: any, b: any) => {
    if (a.latestFact && !b.latestFact) {
      return -1;
    }

    if (!a.latestFact && b.latestFact) {
      return 1;
    }

    return 0;
  });

  return trendingCelebs as TrendingCelebs;
}
