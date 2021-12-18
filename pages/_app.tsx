import React from 'react';
import '../lib/globalStyles.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import {
  StyledEngineProvider,
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from '@mui/material';
import { theme } from '_l/theme';
import Head from 'next/head';

export default ({ Component, pageProps }: AppProps) => {
  return (
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={unstable_createMuiStrictModeTheme(theme)}>
          <Script
            src="https://cse.google.com/cse.js?cx=b70c7f6ba6a334ff2"
            strategy="lazyOnload"
          />

          <Script src="https://www.googletagmanager.com/gtag/js?id=UA-5715214-12" />

          <Script>{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-5715214-12');
          `}</Script>

          <Head>
            <meta charSet="utf-8" />
            <title>Hollowverse: Important people and facts</title>
            <meta
              name="description"
              content="The religion, politics, and ideas of important people"
            ></meta>
            <link rel="shortcut icon" href="/images/icons/favicon.png" />
          </Head>

          <Component {...pageProps} />
        </ThemeProvider>
      </StyledEngineProvider>
    </React.StrictMode>
  );
};
