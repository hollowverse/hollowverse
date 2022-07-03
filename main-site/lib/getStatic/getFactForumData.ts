import { discoursePsqlQuery } from '~/lib/discoursePsqlQuery';
import { processForumContributorFields } from '~/lib/getStatic/processForumContributorFields';
import { getForumTopicId } from '~/shared/lib/getForumTopicId';

export async function getFactForumData(forumLink: string) {
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
}
