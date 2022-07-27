import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from '~/lib/cors';
import { gaRunReport } from '~/lib/getStatic/helpers/analyticsDataClient';
import { setApiCache } from '~/lib/setApiCache';
import { log } from '~/shared/lib/log';

export type FactViewCountResults = Awaited<ReturnType<typeof factViewCount>>;
export type FactViewCountQueryParams = { factId: string };

export async function factViewCount(factId: string) {
  try {
    const factViewCount = await gaRunReport<
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
                  caseSensitive: true,
                },
              },
            },

            {
              filter: {
                fieldName: 'customEvent:id',
                stringFilter: {
                  matchType: 'EXACT',
                  value: factId,
                  caseSensitive: true,
                },
              },
            },
          ],
        },
      },
    });

    if (!factViewCount) {
      return null;
    }

    return factViewCount;
  } catch (e) {
    log('error', `Error retrieving fact view count for ID ${factId}`, {
      error: e as any,
    });

    return null;
  }
}

export default async function factViewCountApi(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  cors(req, res);
  setApiCache(res);

  const { factId } = req.query as FactViewCountQueryParams;

  return res.status(200).json(await factViewCount(factId));
}
