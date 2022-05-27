const forumTopicIdRegExp =
  /https:\/\/.+?\.hollowverse\.com\/t\/.+?\/(\d+)[\/.*]?/i;

export function getForumTopicId(url: string) {
  const regexpResults = url.match(forumTopicIdRegExp);
  const topicId = regexpResults?.[1];

  return topicId;
}
