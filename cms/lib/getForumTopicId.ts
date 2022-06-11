const forumTopicIdRegExp =
  /https:\/\/.+?\.hollowverse\.com\/t\/[^\/]*?\/(\d+)[0-9\/]*$/i;

export function getForumTopicId(url: string) {
  const regexpResults = url.match(forumTopicIdRegExp);
  const topicId = regexpResults?.[1];

  return topicId;
}
