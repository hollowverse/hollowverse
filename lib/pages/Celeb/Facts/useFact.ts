import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Fact } from '~/lib/pages/utils/types';

export function useFact(value: Fact) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [commentCount, setCommentCount] = useState(0);
  const [commentAuthor, setCommentAuthor] = useState('');

  const request = () => {
    fetch(`api/get-fact-social-info?url=${encodeURIComponent(value.forumLink)}`)
      .then((res) => res.json())
      .then((data) => {
        setCommentCount(data.reply_count);
        setCommentAuthor(data.username);
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
    commentAuthor,
  };
}
