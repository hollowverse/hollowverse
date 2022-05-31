export async function getFactSocialInfo(forumLink: string) {
  const res = await fetch(
    `/api/get-fact-social-info?url=${encodeURIComponent(forumLink)}`,
  );
  const data = await res.json();

  return {
    commentCount: data.commentCount,
    contributorUsername: data.contributorUsername,
  };
}
