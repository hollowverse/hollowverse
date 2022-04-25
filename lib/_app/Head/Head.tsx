import React from 'react';
import NextjsHead from 'next/head';
import Script from 'next/script';

export const Head = () => (
  <>
    <Script
      src="https://cse.google.com/cse.js?cx=b70c7f6ba6a334ff2"
      strategy="lazyOnload"
    />

    <Script src="https://www.googletagmanager.com/gtag/js?id=UA-5715214-12" />

    <Script id="google-analytics">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-5715214-12');
    `}</Script>

    <NextjsHead>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <meta charSet="utf-8" />
      <title>Hollowverse: Important people and facts</title>
      <meta
        name="description"
        content="The religion, politics, and ideas of important people"
      />
      {/* Google Font */}
      <link rel="shortcut icon" href="/images/icons/letter-logo.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" />
    </NextjsHead>
  </>
);
