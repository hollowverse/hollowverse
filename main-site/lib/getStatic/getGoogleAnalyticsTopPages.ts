// Imports the Google Analytics Data API client library.
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { startsWith } from 'lodash-es';
import { log } from '~/shared/lib/log';

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY,
  },
});

const GA_PROPERTY_ID = '311007044';

type DimensionFilter = Parameters<
  typeof analyticsDataClient.runReport
>[0]['dimensionFilter'];

async function getGaPageViews(dimensionFilter: DimensionFilter) {
  // `runReport` docs https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${GA_PROPERTY_ID}`,

    dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],

    dimensionFilter,

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
    log('error', 'no trending celebs found', {
      response: response as any,
    });

    return null;
  }

  return response;
}

async function getCelebs(requested = false) {
  const filter: DimensionFilter = requested
    ? {
        filter: {
          fieldName: 'pagePath',
          stringFilter: {
            matchType: 'BEGINS_WITH',
            value: '/~kg',
            caseSensitive: false,
          },
        },
      }
    : {
        filter: {
          fieldName: 'pageReferrer',
          stringFilter: {
            matchType: 'ENDS_WITH',
            value: '~search',
            caseSensitive: false,
          },
        },
      };

  const response = await getGaPageViews(filter);

  if (response === null || response === undefined) {
    return null;
  }

  const paths: any[] = [];
  const titles: any[] = [];

  for (let i = 0; response.rows!.length > i; i++) {
    const row = response.rows![i];
    const dimensionValues = row.dimensionValues;

    if (!dimensionValues) {
      continue;
    }

    const path = dimensionValues[0].value;
    const title = dimensionValues[1].value;

    if (requested) {
      if (!path || path === '/') {
        continue;
      }
    } else {
      if (!path || path === '/' || startsWith(path, '/~')) {
        continue;
      }
    }

    paths.push(path.substring(1, path.length));
    titles.push(title);
  }

  return { titles, paths };
}

export async function getGaMostSearchedCelebs() {
  return (await getCelebs())?.paths;
}

export async function getGaAllTrendingCelebs() {
  return {
    searches: await getCelebs(),
    requests: await getCelebs(true),
  };
}
