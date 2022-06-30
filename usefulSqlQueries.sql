-- Get a count of posts by username
SELECT users.username, count(posts.user_id)
FROM users LEFT JOIN posts ON users.id=posts.user_id
GROUP BY users.id ORDER BY count DESC
