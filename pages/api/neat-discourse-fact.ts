import { isValidRequest } from '@sanity/webhook';
import type { NextApiRequest, NextApiResponse } from 'next';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { DiscourseTopicFact } from '~/components/DiscourseTopicFact';
import { apiHandlerWithErrorLogging } from '~/lib/apiHandlerWithErrorLogging';
import { discourseClientApi } from '~/lib/discourseClientApi';

async function neatDiscourseFact(req: NextApiRequest, res: NextApiResponse) {
  if (!isValidRequest(req, process.env.PRIVILEGED_API_SECRET!)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { body } = req;

  console.log('body', body);

  const topicId = 1619;

  const topic = await discourseClientApi(`t/-/${topicId}.json`);
  const topicOpId = topic.post_stream.posts[0].id;

  const fact = ReactDOMServer.renderToStaticMarkup(
    React.createElement(DiscourseTopicFact, body),
  );

  await discourseClientApi(`posts/${topicOpId}.json`, {
    method: 'PUT',
    body: {
      post: {
        raw: fact,
      },
    },
  });

  return res.json({ ok: true });
}

export default async function withErrorHandling(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    return await neatDiscourseFact(req, res);
  } catch (e) {
    console.log('e', e);
    /**
     * This `content-change-notify` API handler triggered by a Sanity webhook.
     * And the Sanity webhook will keep retrying infinitely if we return
     * anything but success.
     *
     * So we just log whatever the issue is and tell the webhook "ok" to shut it
     * up.
     */
    return res.json({ ok: true });
  }
}
