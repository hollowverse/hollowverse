// Imports the Google Analytics Data API client library.
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { GA_PROPERTY_ID } from '~/lib/googleAnalytics';
import { log } from '~/shared/lib/log';
import { Json } from '~/shared/lib/types';

type ReportParams = Parameters<typeof analyticsDataClient.runReport>[0];

export type Dimensions = ReportParams['dimensions'];
export type Metrics = ReportParams['metrics'];
export type DimensionFilter = ReportParams['dimensionFilter'];

export const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY,
  },
});

// `runReport` docs https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport
export async function gaRunReport<T extends Json[]>(props: {
  dimensions: NonNullable<Dimensions>;
  metrics: Metrics;
  dimensionFilter?: DimensionFilter;
  limit?: number;
}) {
  const limit = props.limit ?? 25;

  const [response] = await analyticsDataClient.runReport({
    property: `properties/${GA_PROPERTY_ID}`,

    ...props,

    limit,

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

  const rows: any = [];

  for (let i = 0; response.rows!.length > i; i++) {
    const obj: any = {};
    const row = response.rows![i];
    const dimensionValues = row.dimensionValues;

    if (!dimensionValues) {
      continue;
    }

    [
      [row.dimensionValues, props.dimensions] as const,
      [row.metricValues, props.metrics] as const,
    ].forEach(([values, parameterValues]) => {
      for (let i2 = 0; i2 < values!.length; i2++) {
        obj[parameterValues![i2].name!] = values![i2].value;
      }
    });

    rows.push(obj);
  }

  return rows as T;
}
