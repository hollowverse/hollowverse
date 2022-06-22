import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { logger } from '~/shared/lib/log';

export function apiHandlerWithErrorLogging(
  apiRouteName: string,
  fn: NextApiHandler<any>,
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      return await fn(req, res);
    } catch (e: any) {
      logger.error(`Route ${apiRouteName} failed`);
      logger.error(e);
      throw e;
    }
  };
}
