import Cors from 'cors';
import { endsWith, isString } from 'lodash-es';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandlerWithErrorLogging } from '~/lib/apiHandlerWithErrorLogging';
import { discourseApiClient } from '~/lib/discourseApiClient';
import { getForumTopicId } from '~/lib/getForumTopicId';
import { initMiddleware } from '~/lib/initMiddleware';
import { log } from '~/shared/lib/log';

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

async function getFactSocialInfo(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);

  const queryUrl = req.query.url;

  log('info', 'get-fact-social-info', [queryUrl as string]);

  if (!queryUrl || !isString(queryUrl)) {
    throw new Error(
      `URL query param required. Received ${JSON.stringify(queryUrl)}`,
    );
  }

  const topicId = getForumTopicId(queryUrl);

  if (!topicId) {
    throw new Error(`Cant find post ID in: ${queryUrl}`);
  }

  const topic = await discourseApiClient(
    'get-fact-social-info',
    `t/-/${topicId}.json`,
  );

  if (!topic) {
    throw new Error(`Could not find topic for Topic ID: ${topicId}`);
  }

  return res.json({
    commentCount: topic.posts_count - 1,
    contributorUsername: topic.details.created_by.username,
  });
}

export default apiHandlerWithErrorLogging(
  'get-fact-social-info',
  getFactSocialInfo,
);
