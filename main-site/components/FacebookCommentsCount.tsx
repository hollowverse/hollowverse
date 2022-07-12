import { useEffect } from 'react';
import { getFactPagePathname } from '~/lib/getFactPagePathname';
import { Fact } from '~/lib/groq/fact.projection';

export function FacebookCommentsCount(props: { slug: string; fact: Fact }) {
  useEffect(() => {
    if (window.FB) {
      window.FB?.XFBML?.parse();
    }
  });

  return (
    <div
      className="fb-comments-count"
      data-href={`https://hollowverse.com/${getFactPagePathname(
        props.slug,
        props.fact,
      )}`}
    />
  );
}
