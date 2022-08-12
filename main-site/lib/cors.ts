import Cors from 'cors';
import { endsWith } from 'lodash-es';
import type { NextApiRequest, NextApiResponse } from 'next';
import { VERCEL_TEMP_DOMAIN } from '~/lib/constants';

export function isHvHostname(hostname: string) {
  return (
    endsWith(hostname, 'localhost') ||
    endsWith(hostname, 'hollowverse.com') ||
    endsWith(hostname, VERCEL_TEMP_DOMAIN)
  );
}

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function initMiddleware(middleware: ReturnType<typeof Cors>) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

export const cors = initMiddleware(
  Cors({
    origin: function (origin, callback) {
      if (origin === undefined) {
        callback(null, false);
      }

      const url = new URL(origin!);

      if (isHvHostname(url.hostname)) {
        callback(null, true);
        return;
      }

      callback(null, false);
      return;
    },
    methods: ['GET'],
  }),
);
