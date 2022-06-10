import { AppProps } from 'next/app';
import Script from 'next/script';
import React from 'react';
import { PageTransitionSpinner } from '~/components/PageTransitionSpinner';
import { GA_MEASUREMENT_ID } from '~/lib/gtag';
import '~/styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
          `,
        }}
      />
      <PageTransitionSpinner />
      <Component {...pageProps} />
    </>
  );
}
