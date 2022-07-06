import { gaRunReport } from '~/lib/getStatic/helpers/analyticsDataClient';

export async function getTrendingIssues() {
  const trendingIssues = await gaRunReport<
    {
      'customEvent:name': string;
      eventName: string;
      eventCount: number;
    }[]
  >({
    dimensions: [
      { name: 'customEvent:name' },
      { name: 'customEvent:id' },
      { name: 'eventName' },
    ],

    metrics: [{ name: 'eventCount' }],

    dimensionFilter: {
      andGroup: {
        expressions: [
          {
            filter: {
              fieldName: 'eventName',
              stringFilter: {
                matchType: 'EXACT',
                value: 'issue_view',
                caseSensitive: false,
              },
            },
          },

          {
            notExpression: {
              filter: {
                fieldName: 'customEvent:name',
                stringFilter: {
                  matchType: 'EXACT',
                  value: '(not set)',
                  caseSensitive: false,
                },
              },
            },
          },
        ],
      },
    },
  });

  return trendingIssues?.map((issueEvent) => {
    return issueEvent['customEvent:name'];
  });
}
