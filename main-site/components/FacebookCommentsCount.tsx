import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getFactPagePathname } from '~/lib/getFactPagePathname';
import { Fact } from '~/lib/groq/fact.projection';

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
    </div>
  );
}
