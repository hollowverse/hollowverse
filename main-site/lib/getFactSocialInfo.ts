import { nextApiClient } from '~/shared/lib/nextApiClient';

export async function getFactSocialInfo(forumLink: string) {
  let commentCount: number | null = null;
  let contributorUsername: string | null = null;

  const data = await nextApiClient(
    `get-fact-social-info?url=${encodeURIComponent(forumLink)}`,
  );

  if (data) {
    commentCount = data.commentCount;
    contributorUsername = data.contributorUsername;
  }

  return {
    commentCount,
    contributorUsername,
  };
}
