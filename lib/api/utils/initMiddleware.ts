// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextMiddlewareResult } from 'next/dist/server/web/types';
import Cors from 'cors';

export function initMiddleware(middleware: ReturnType<typeof Cors>) {
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
