import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Spinner } from '~/lib/Spinner';

export function FacebookComments(props: { pathname: string; limit?: number }) {
  const limit = props.limit ?? 10;

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px',
  });

  useEffect(() => {
    if (window.FB) {
      window.FB?.XFBML?.parse();
    }
  });

  return (
    <div
      key={props.pathname}
      ref={ref}
      className="pointer-events-auto flex min-h-[150px] flex-col items-center justify-center"
    >
      {inView && (
        <div
          className="fb-comments"
          data-href={`http://hollowverse.com/${props.pathname}/`}
          data-mobile="true"
          data-numposts={limit}
          data-order-by="reverse_time"
        />
      )}

      <div className="fb-comments-spinner flex flex-col items-center justify-center gap-2">
        <Spinner />
        <p className="text-neutral-500">Loading comments...</p>
      </div>
    </div>
  );
}
