import { random, result } from 'lodash-es';
import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from '~/lib/api-route-helpers/cors';
import { setApiCache } from '~/lib/api-route-helpers/setApiCache';
import { gaRunReport } from '~/lib/getStatic/helpers/analyticsDataClient';

export type RelatedCelebs = Awaited<ReturnType<typeof getFactViewCounts>>;
export type RelatedCelebsQueryParams = { tagId: string; slug: string };

export async function getFactViewCounts(factIds: string[]) {
  const viewCounts = await gaRunReport<
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
                value: 'fact_view',
                caseSensitive: false,
              },
            },
          },

          {
            orGroup: {
              expressions: factIds.map((fid) => {
                return {
                  filter: {
                    fieldName: 'customEvent:id',
                    stringFilter: {
                      matchType: 'EXACT',
                      value: fid,
                    },
                  },
                };
              }),
            },
          },
        ],
      },
    },

    dateRanges: [
      {
        startDate: '365daysAgo',
        endDate: 'today',
      },
    ],
  });

  const results = factIds.map((fid) => {
    let viewCount =
      viewCounts?.find((vc) => vc['customEvent:id'] === fid)?.eventCount ||
      getEstimatedViewCount();

    return {
      factId: fid,
      viewCount,
    };
  });

  console.log('results', results);

  return results;
}

function getEstimatedViewCount() {
  return `~${random(10, 20)}`;
}

export default async function getFactViewCountsApi(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  cors(req, res);
  setApiCache(res);

  const { factIds } = JSON.parse(req.body) as { factIds: string[] };
  console.log('=\nFILE: get-fact-view-counts.ts\nLINE: 66\n=');

  return res.status(200).json(await getFactViewCounts(factIds));
}
