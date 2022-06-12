import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { log } from '~/shared/lib/log';

export function apiHandlerWithErrorLogging(
  apiRouteName: string,
  fn: NextApiHandler<any>,
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      return await fn(req, res);
    } catch (e: any) {
      log('error', e, [apiRouteName]);
      throw e;
    }
  };
}
