import { withSentry } from '@sentry/nextjs';
import { endsWith, isString } from 'lodash-es';
import type { NextApiRequest, NextApiResponse } from 'next';
import { discourseClientApi } from '~/lib/discourseClientApi';
import Cors from 'cors';
import { initMiddleware } from '~/lib/initMiddleware';

const vercelTempDomain = '-hollowverse.vercel.app';

const cors = initMiddleware(
  Cors({
    origin: function (origin, callback) {
      if (origin === undefined) {
        callback(null, false);
      }

      const url = new URL(origin!);

      if (
        url.hostname === 'hollowverse.com' ||
        url.hostname === 'localhost' ||
        endsWith(url.hostname, vercelTempDomain)
      ) {
        callback(null, true);
      }

      callback(null, false);
    },
    methods: ['GET'],
  }),
);

const topicIdRegExp = /https?:\/\/.+\/t\/.+\/(\d+)/i;

export default async function _getFactSocialInfo(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await cors(req, res);

  const queryUrl = req.query.url;

  if (!queryUrl || !isString(queryUrl)) {
    throw new Error(
      `URL query param required. Received ${JSON.stringify(queryUrl)}`,
    );
  }

  const regexpResults = queryUrl.match(topicIdRegExp);
  const topicId = regexpResults?.[1];

  if (!topicId) {
    throw new Error(`Cant find post ID in: ${queryUrl}`);
  }

  const topic = await discourseClientApi(`t/-/${topicId}.json`);

  if (!topic) {
    throw new Error(`Could not find topic for Topic ID: ${topicId}`);
  }

  return res.json({
    reply_count: topic.reply_count,
    username: topic.details.created_by.username,
  });
}

// export const getFactSocialInfo = withSentry(_getFactSocialInfo);
// export const getFactSocialInfo = _getFactSocialInfo;
