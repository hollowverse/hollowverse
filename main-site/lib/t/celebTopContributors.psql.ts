import { Contributor } from '~/lib/p/processForumContributorFields';
import { contributorFieldsPsql } from '~/lib/c/contributor.fields';
import { sql } from '~/lib/sql';

export type TopContributors = (Contributor & { count: number })[];

export const celebTopContributorsPsql = sql`
-- [params]
-- text :slug

select
  ${contributorFieldsPsql},
  count(users.username) as "count"
from users
  inner join topics on users.id = topics.user_id
  inner join user_profiles on users.id = user_profiles.user_id

  inner join topic_tags on topic_tags.topic_id = topics.id
  inner join tags on tags.id = topic_tags.tag_id and tags.name = 'accepted'

  inner join topic_tags tt2 on tt2.topic_id = topics.id
  inner join tags tags2 on tags2.id = tt2.tag_id and tags2.name = :slug
group by
  users.username,
  user_profiles.website,
  user_profiles.bio_cooked,
  users.uploaded_avatar_id,
  users.name
order by "count" DESC
LIMIT 10
`;
