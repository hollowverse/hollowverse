import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getFactPagePathname } from '~/lib/g/getFactPagePathname';
import { Fact } from '~/lib/f/fact.projection';

export function FacebookCommentsCount(props: { slug: string; fact: Fact }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (window.FB) {
      window.FB?.XFBML?.parse();
    }
  });

  return (
    <div ref={ref}>
      {inView && (
        <div
          className="fb-comments-count"
          data-href={`https://hollowverse.com${getFactPagePathname(
            props.slug,
            props.fact,
          )}`}
        />
      )}

      <span className="fb-comments-count-zero-text">Comment</span>
    </div>
  );
}
