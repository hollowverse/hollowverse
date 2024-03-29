import { isString } from 'lodash-es';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandlerWithErrorLogging } from '~/lib/apiHandlerWithErrorLogging';
import { cors } from '~/lib/cors';
import { discourseApiClient } from '~/lib/discourseApiClient';
import { getForumTopicId } from '~/shared/lib/getForumTopicId';
import { log } from '~/shared/lib/log';

async function getFactSocialInfo(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);

  const queryUrl = req.query.url;

  log('info', `get-fact-social-info: ${queryUrl}`);

  if (!queryUrl || !isString(queryUrl)) {
    throw new Error(
      `URL query param required. Received ${JSON.stringify(queryUrl)}`,
    );
  }

  const topicId = getForumTopicId(queryUrl);

  if (!topicId) {
    throw new Error(`Cant find post ID in: ${queryUrl}`);
  }

  const topic = await discourseApiClient({ api: `t/-/${topicId}.json` });

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
