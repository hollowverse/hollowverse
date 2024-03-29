import { discoursePsqlQuery } from '~/lib/disabled/discoursePsqlQuery';
import { processForumContributorFields } from '~/lib/disabled/processForumContributorFields';
import { getForumTopicId } from '~/shared/lib/getForumTopicId';
import { log } from '~/shared/lib/log';

export async function getFactForumData(forumLink: string) {
  try {
    // const topicId = '3672';
    const topicId = getForumTopicId(forumLink);

    if (!topicId) {
      return null;
    }

    const factForumData = (
      await discoursePsqlQuery({
        name: 'fact-page-data',
        params: { topic_id: topicId },
      })
    )?.[0];

    if (!factForumData) {
      return null;
    }

    const { comments, ...contributor } = factForumData;

    return {
      contributor: processForumContributorFields(contributor),
      comments,
    };
  } catch (e) {
    log('error', 'Error retrieving fact forum data', { error: e as any });

    return null;
  }
}
