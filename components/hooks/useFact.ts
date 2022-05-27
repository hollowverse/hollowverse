import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Fact } from '~/lib/groq/fact.partial.groq';

export function useFact(fact: Fact) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [commentCount, setCommentCount] = useState<number | null>(null);
  const [contributorUsername, setContributor] = useState<string | null>(null);

  const request = () => {
    fetch(`/api/get-fact-social-info?url=${encodeURIComponent(fact.forumLink)}`)
      .then((res) => res.json())
      .then((data) => {
        setCommentCount(data.commentCount);
        setContributor(data.contributorUsername);
      });
  };

  useEffect(() => {
    if (inView) {
      request();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return {
    ref,
    inView,
    commentCount,
    contributorUsername,
  };
}
