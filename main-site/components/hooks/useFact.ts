import { useEffect, useState } from 'react';
import { getFactSocialInfo } from '~/lib/getFactSocialInfo';
import { Fact } from '~/lib/groq/fact.projection';

export function useFact(fact: Fact) {
  const [commentCount, setCommentCount] = useState<number | null>(null);
  const [contributorUsername, setContributor] = useState<string | null>(null);

  async function request() {
    const data = await getFactSocialInfo(fact.forumLink);

    setCommentCount(data.commentCount);
    setContributor(data.contributorUsername);
  }

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    commentCount,
    contributorUsername,
  };
}
