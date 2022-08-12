import { gaRunReport } from '~/lib/analyticsDataClient';

export async function getTrendingIssues() {
  const trendingIssues = await gaRunReport<
    {
      'customEvent:id': string;
      eventName: string;
      eventCount: number;
    }[]
  >({
    dimensions: [{ name: 'customEvent:id' }, { name: 'eventName' }],

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
                fieldName: 'customEvent:id',
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
    return issueEvent['customEvent:id'];
  });
}
