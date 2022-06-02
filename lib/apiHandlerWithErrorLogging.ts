import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { log } from '~/lib/log';

export function apiHandlerWithErrorLogging(fn: NextApiHandler<any>) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      return await fn(req, res);
    } catch (e: any) {
      log().error(e);
      throw e;
    }
  };
}
