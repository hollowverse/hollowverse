// Imports the Google Analytics Data API client library.
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import groq from 'groq';
import { startsWith } from 'lodash-es';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandlerWithErrorLogging } from '~/lib/apiHandlerWithErrorLogging';
import { GA_TRACKING_ID } from '~/lib/gtag';
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

async function getTrendingCelebs(_req: NextApiRequest, res: NextApiResponse) {
  const gaTopPages = await getGaTopPages();
  console.log('gaTopPages', gaTopPages);
  const trendingCelebs = await sanityClient.fetch(
    'trending-celebs',
    groq`*[_type == 'celeb' && slug.current in $slugs] {
      name,
      'slug': slug.current,
      'picture': picture.asset->{_id, 'metadata': {'lqip': metadata.lqip, 'palette': metadata.palette}}
    }`,
    { slugs: gaTopPages },
  );

  return res.json(trendingCelebs);
}

export default apiHandlerWithErrorLogging(
  'get-trending-celebs',
  getTrendingCelebs,
);
