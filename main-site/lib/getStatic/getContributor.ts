import { pick } from 'lodash-es';
import { discourseApiClient } from '~/lib/discourseApiClient';
import { getForumTopicId } from '~/shared/lib/getForumTopicId';

type Contributor = {
  username: string;
  name: string;
  bio_excerpt: string;
  avatar_template: string;
  website: string;
  website_name: string;
};

export async function getContributor(forumLink: string) {
  const topicId = getForumTopicId(forumLink);
  const topic = await discourseApiClient(`t/-/${topicId}.json`);
  const username = topic.details.created_by.username;
  const user = await discourseApiClient<{ user: Contributor }>(`u/mksafi.json`);
  const contributor = pick(user.user, [
    'username',
    'name',
    'bio_excerpt',
    'avatar_template',
    'website',
    'website_name',
  ]) as Contributor;

  return contributor;
}
