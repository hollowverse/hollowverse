import { sql } from '~/lib/sql';

export const contributorFieldsPsql = sql`
users.name,
users.username,
users.uploaded_avatar_id,
user_profiles.bio_cooked as "bio_cooked",
user_profiles.website as "website"
`;
