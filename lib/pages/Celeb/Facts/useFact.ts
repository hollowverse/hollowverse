import { useEffect, useState } from 'react';
import { useCelebContext } from '~/lib/pages/components/StaticPropsContextProvider';
import { useInView } from 'react-intersection-observer';
import { Fact } from '~/lib/pages/utils/types';

export function useFact(value: Fact) {
  const {
    celeb: { name },
  } = useCelebContext();
  const { ref, inView } = useInView({ triggerOnce: true });
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    async function request() {
      const response = await fetch(
        `api/get-fact-social-info?url=${encodeURIComponent(value.forumLink)}`,
      );

      const factSocialInfo = await response.json();

      setCommentCount(factSocialInfo.reply_count);
    }

    if (inView) {
      request();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return {
    name,
    ref,
    inView,
    commentCount,
  };
}
