import { sql } from '~/lib/s/sql';

export type ContributorPsql = {
  name?: string;
  username: string;
  uploaded_avatar_id?: string;
  bio_cooked?: string;
  website?: string;
};

export const contributorFieldsPsql = sql`
users.name,
users.username,
users.uploaded_avatar_id,
user_profiles.bio_cooked as "bio_cooked",
user_profiles.website as "website"
`;
