import { NextApiClient } from '~/lib/NextApiClient';

export async function getFactSocialInfo(forumLink: string) {
  let commentCount: number | null = null;
  let contributorUsername: string | null = null;

  const res = await NextApiClient(
    `/api/get-fact-social-info?url=${encodeURIComponent(forumLink)}`,
  );

  if (res) {
    const data = await res.json();

    commentCount = data.commentCount;
    contributorUsername = data.contributorUsername;
  }

  return {
    commentCount,
    contributorUsername,
  };
}
