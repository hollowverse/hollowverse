import { gaRunReport } from '~/lib/getStatic/helpers/analyticsDataClient';
import { Summaries } from '~/lib/getStatic/helpers/getParsedOldContent';
import { Picture } from '~/lib/groq/picture.projection';

export async function getTrendingIssues() {
  const trendingIssues = await gaRunReport<
    {
      'customEvent:name': string;
      eventName: string;
      eventCount: number;
    }[]
  >({
    dimensions: [{ name: 'customEvent:name' }, { name: 'eventName' }],

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
        ],
      },

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
  });

  // console.log('trendingIssues', trendingIssues);
}
