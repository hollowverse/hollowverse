-- Get count of accepted submissions by celeb tag
select
  users.username,
  count(users.username) as "count"
from users
  inner join topics on users.id = topics.user_id

  inner join topic_tags on topic_tags.topic_id = topics.id
  inner join tags on tags.id = topic_tags.tag_id and tags.name = 'accepted'

  inner join topic_tags tt2 on tt2.topic_id = topics.id
  inner join tags tags2 on tags2.id = tt2.tag_id and tags2.name = 'danny-devito'
group by users.username
order by "count" DESC;
