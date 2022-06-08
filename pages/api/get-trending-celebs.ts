import { isValidRequest } from '@sanity/webhook';
import groq from 'groq';
import { isEmpty } from 'lodash-es';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandlerWithErrorLogging } from '~/lib/apiHandlerWithErrorLogging';
import { collectErrors } from '~/lib/collectErrors';
import {
  ContentChangeData,
  contentChangeProjection,
} from '~/lib/groq/contentChange.groq';
import { log } from '~/lib/log';
import { performPostPublishChores } from '~/lib/performPostPublishChores';
import { sanityClientNoCdn } from '~/lib/sanityio';

/**
 * TODO(developer): Uncomment this variable and replace with your
 *   Google Analytics 4 property ID before running the sample.
 */
const propertyId = '311007044';

// Imports the Google Analytics Data API client library.
import { BetaAnalyticsDataClient } from '@google-analytics/data';

// Using a default constructor instructs the client to use the credentials
// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: 'asdf',
    private_key: 'adsf',
  },
});

// Runs a simple report.
async function runReport() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: '2020-03-31',
        endDate: 'today',
      },
    ],
    dimensions: [
      {
        name: 'city',
      },
    ],
    metrics: [
      {
        name: 'activeUsers',
      },
    ],
  });

  console.log('Report result:');
  response?.rows?.forEach((row: any) => {
    console.log(row.dimensionValues[0], row.metricValues[0]);
  });
}

runReport();

async function getTrendingCelebs(_req: NextApiRequest, res: NextApiResponse) {
  log('info', 'get-trending-celebs');

  await runReport();

  return res.json({ ok: true });
}

export default apiHandlerWithErrorLogging(
  'get-trending-celebs',
  getTrendingCelebs,
);
