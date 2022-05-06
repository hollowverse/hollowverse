import { CacheProvider, EmotionCache } from '@emotion/react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useEffect } from 'react';
import { createEmotionCache } from '~/lib/components/createEmotionCache';
import { gaPageView, GA_TRACKING_ID } from '~/lib/components/gtag';
import { StaticPropsContextProvider } from '~/lib/components/StaticPropsContextProvider';
import { Footer } from '~/lib/_app/Footer/Footer';
import { Head } from '~/lib/_app/Head/Head';

const clientSideEmotionCache = createEmotionCache();

export const App = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps & { emotionCache: EmotionCache }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gaPageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <CacheProvider value={emotionCache}>
        <Head />
        <StaticPropsContextProvider value={pageProps}>
            <Component {...pageProps} />
            <Footer />
        </StaticPropsContextProvider>
      </CacheProvider>
    </>
  );
};
