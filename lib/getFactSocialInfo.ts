import pThrottle from 'p-throttle';

async function _getFactSocialInfo(forumLink: string) {
  const res = await fetch(
    `/api/get-fact-social-info?url=${encodeURIComponent(forumLink)}`,
  );
  const data = await res.json();

  return {
    commentCount: data.commentCount,
    contributorUsername: data.contributorUsername,
  };
}

export const getFactSocialInfo = pThrottle({ limit: 1, interval: 3000 })(
  _getFactSocialInfo,
);
