import { discoursePsqlQuery } from '~/lib/discoursePsqlQuery';
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

  if (!topicId) {
    return null;
  }

  const factForumData = await discoursePsqlQuery({
    name: 'fact-page-data',
    params: { topic_id: topicId },
  });

  const results = factForumData.rows[0];
  const [name, username, avatarId, bio, website, commentCount] = results;

  return {
    contributor: {
      name,
      username,
      bio,
      picture: `https://forum.hollowverse.com/user_avatar/forum.hollowverse.com/${username}/150/${avatarId}.png`,
      website,
    },
    commentCount,
  };

  // const username = factForumData.details.created_by.username;
  // const user = await discourseApiClient<{ user: Contributor }>(`u/mksafi.json`);
  // const contributor = pick(user.user, [
  //   'username',
  //   'name',
  //   'bio_excerpt',
  //   'avatar_template',
  //   'website',
  //   'website_name',
  // ]) as Contributor;

  // return contributor;
}
