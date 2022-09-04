import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';
import Script from 'next/script';
import createEmotionCache from '~/lib/createEmotionCache';
import { GA_MEASUREMENT_ID, GA_TRACKING_ID } from '~/lib/googleAnalytics';
import { useGoogleAnalyticsUniversal } from '~/lib/googleAnalyticsUniversal';
import { PageTransitionSpinner } from '~/lib/PageTransitionSpinner';
import { theme } from '~/lib/theme';
import { useIdentifyingCookie } from '~/lib/useIdentifyingCookie';
import { getVercelEnv } from '~/shared/lib/getVercelEnv';
import '~/styles/global.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  useGoogleAnalyticsUniversal();
  useIdentifyingCookie();

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <>
      {getVercelEnv() !== 'preview' && (
        <Script
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8989100382265388"
          crossOrigin="anonymous"
        />
      )}

      <div id="fb-root" className="hidden" />
      <Script
        id="facebook-sdk"
        strategy="lazyOnload"
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v14.0&appId=528201628925813"
        crossOrigin="anonymous"
        nonce="ouUS8tJS"
      />

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />

      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}');
          gtag('config', '${GA_TRACKING_ID}');
          `,
        }}
      />

      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <PageTransitionSpinner />

          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
