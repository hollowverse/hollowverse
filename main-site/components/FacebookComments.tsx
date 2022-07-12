import Script from 'next/script';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Spinner } from '~/components/Spinner';

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
    <div key={props.pathname} ref={ref}>
      <div className="relative z-0 min-h-[150px] p-2">
        {inView && (
          <div className="z-30 bg-white">
            <div
              className="fb-comments absolute inset-0"
              data-href={`https://hollowverse.com/${props.pathname}`}
              data-mobile="true"
              data-numposts={limit}
              data-order-by="reverse-time"
            />
          </div>
        )}

        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <Spinner />
            <p className="text-neutral-500">Loading comments...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
