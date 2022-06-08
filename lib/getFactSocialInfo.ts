import { NextApiClient } from '~/lib/NextApiClient';

export async function getFactSocialInfo(forumLink: string) {
  const res = await NextApiClient(
    `/api/get-fact-social-info?url=${encodeURIComponent(forumLink)}`,
  );
  const data = await res.json();

  return {
    commentCount: data.commentCount,
    contributorUsername: data.contributorUsername,
  };
}
