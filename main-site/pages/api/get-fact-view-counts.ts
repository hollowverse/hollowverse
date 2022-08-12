import { isEmpty, random, uniq } from 'lodash-es';
import { NextApiRequest, NextApiResponse } from 'next';
import QueryString from 'qs';
import { cors } from '~/lib/c/cors';
import { setApiCache } from '~/lib/s/setApiCache';
import { gaRunReport } from '~/lib/a/analyticsDataClient';

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

  return results;
}

function getEstimatedViewCount() {
  return `~${random(30, 50)}`;
}

export default async function getFactViewCountsApi(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  cors(req, res);
  setApiCache(res);

  const { factIds } = QueryString.parse(req.query as any, {
    arrayLimit: Infinity,
  }) as any as { factIds: string[] };

  const uniqFactIds = uniq(factIds);

  if (isEmpty(uniqFactIds)) {
    return res.status(200).json([]);
  }

  return res.status(200).json(await getFactViewCounts(uniqFactIds));
}
