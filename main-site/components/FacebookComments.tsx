import Script from 'next/script';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Spinner } from '~/components/Spinner';

export function FacebookComments(props: {
  pathname: string;
  numposts?: number;
}) {
  const numposts = props.numposts ?? 10;

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
      {inView && (
        <>
          <div id="fb-root" className="hidden" />
          <Script
            id="facebook-sdk"
            strategy="lazyOnload"
            src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v14.0&appId=528201628925813&autoLogAppEvents=1"
            crossOrigin="anonymous"
            nonce="ouUS8tJS"
          />
        </>
      )}

      <div className="relative z-0 min-h-[150px] p-2">
        {inView && (
          <div className="z-30 bg-white">
            <div
              className="fb-comments absolute inset-0"
              data-href={`https://hollowverse.com/${props.pathname}`}
              data-mobile="true"
              data-numposts={numposts}
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
