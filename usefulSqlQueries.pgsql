-- Get count of accepted submissions by celeb tag
-- [params]
-- text :slug

select
  users.name,
  users.username,
  users.uploaded_avatar_id,
  user_profiles.bio_cooked as "bio_cooked",
  user_profiles.website as "website",
  count(users.username) as "contributions_count"
from users
  inner join topics on users.id = topics.user_id
  inner join user_profiles on users.id = user_profiles.user_id

  inner join topic_tags on topic_tags.topic_id = topics.id
  inner join tags on tags.id = topic_tags.tag_id and tags.name = 'accepted'

  inner join topic_tags tt2 on tt2.topic_id = topics.id
  inner join tags tags2 on tags2.id = tt2.tag_id and tags2.name = 'danny-devito'
group by
  users.username,
  user_profiles.website,
  user_profiles.bio_cooked,
  users.uploaded_avatar_id,
  users.name
order by "contributions_count" DESC
LIMIT 10
