import React from 'react';
import NextjsHead from 'next/head';
import Script from 'next/script';

export const Head = () => (
  <NextjsHead>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <meta charSet="utf-8" />
    <title>Hollowverse: Important people and facts</title>
    <meta
      name="description"
      content="The religion, politics, and ideas of important people"
    />
    <link rel="shortcut icon" href="/images/icons/letter-logo.png" />
  </NextjsHead>
);
