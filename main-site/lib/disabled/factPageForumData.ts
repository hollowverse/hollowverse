import {
  contributorFieldsPsql,
  ContributorPsql,
} from '~/lib/disabled/contributor.fields';
import { sql } from '~/lib/sql';

export type FactPageForumDataPsql = ContributorPsql & { comments: number };

export const factPageForumDataPsql = sql`
-- [params]
-- int :topic_id

select
  ${contributorFieldsPsql},
  topics.posts_count - 1 as "comments"
from topics
  inner join users on users.id = topics.user_id
  inner join user_profiles on users.id = user_profiles.user_id
where
  topics.id = :topic_id
LIMIT 1
`;
