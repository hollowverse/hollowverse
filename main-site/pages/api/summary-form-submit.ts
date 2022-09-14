import { isEmpty, remove } from 'lodash-es';
import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from '~/lib/cors';
import { createSummaryFormForumPost } from '~/lib/createSummaryFormForumPost';
import { discourseApiClient } from '~/lib/discourseApiClient';
import { SummaryFormPayload } from '~/lib/SummaryForm';
import { summaryFormValidate } from '~/lib/summaryFormValidate';
import { getUserAuth } from '~/lib/user-auth';

const ongoingSubmissions: string[] = [];

export default async function summaryFormSubmit(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  cors(req, res);

  let userId: string | null = '';

  try {
    if (req.method !== 'POST') {
      return res.status(500).json({ message: 'Unrecognized operation' });
    }

    const auth = getUserAuth(req, res);

    if (!auth) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const payload = JSON.parse(req.body) as SummaryFormPayload;

    if (!isEmpty(summaryFormValidate(payload))) {
      return res.status(403).json({ message: 'Bad request' });
    }

    const topicTitle = `${payload.celeb.name}'s page edits`;

    let searchResults = await discourseApiClient({
      api: `search.json?q=${encodeURI(
        `${topicTitle} @hollowverse #edits order:latest_topic in:title status:open`,
      )}`,
    });

    const topic =
      searchResults?.topics?.[0] ||
      (await discourseApiClient({
        api: 'posts.json',
        username: 'hollowverse',
        payload: {
          method: 'POST',
          body: {
            title: topicTitle,
            raw: `Use this topic to suggest and discuss edits to <a href="https://hollowverse.com/${payload.celeb.slug}">${payload.celeb.name}'s page</a>.`,
            category: 11,
          },
        },
      }));

    const post = await discourseApiClient({
      api: 'posts.json',
      username: auth.username,
      payload: {
        method: 'POST',
        body: {
          topic_id: topic.topic_id || topic.id,
          raw: createSummaryFormForumPost(payload),
        },
      },
    });

    return res.status(200).json(post);
  } catch (err: any) {
    removeUserFromOngoingSubmissions(userId);

    return res
      .status(500)
      .json(JSON.stringify(err, Object.getOwnPropertyNames(err)));
  }

  function removeUserFromOngoingSubmissions(_userId: string | null) {
    remove(ongoingSubmissions, (uid) => uid === _userId);
  }
}
