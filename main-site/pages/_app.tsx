import { AppProps } from 'next/app';
import Script from 'next/script';
import { PageTransitionSpinner } from '~/components/PageTransitionSpinner';
import { GA_MEASUREMENT_ID, GA_TRACKING_ID } from '~/lib/googleAnalytics';
import { useGoogleAnalyticsUniversal } from '~/lib/googleAnalyticsUniversal';
import '~/styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  useGoogleAnalyticsUniversal();

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8989100382265388"
        crossOrigin="anonymous"
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
      <PageTransitionSpinner />
      <Component {...pageProps} />
    </>
  );
}
