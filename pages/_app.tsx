import React from 'react';
import '../lib/globalStyles.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import {
  AppBar,
  Container,
  Divider,
  Link,
  StyledEngineProvider,
  ThemeProvider,
  Typography,
  unstable_createMuiStrictModeTheme,
} from '@mui/material';
import { theme } from '_l/theme';
import Head from 'next/head';
import Image from 'next/image';
import s from './_app.module.scss';

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
            <link rel="shortcut icon" href="/images/icons/letter-logo.png" />
          </Head>

          <AppBar
            elevation={1}
            color="transparent"
            position="static"
            className={s.appBar}
          >
            <Container maxWidth="md" className={s.appBarContainer}>
              <a className={s.logo} href="/">
                <Image
                  src="/images/logo.svg"
                  width={200}
                  height={20}
                  alt="Hollowverse"
                />
                <Typography variant="body2" className={s.logoSubtitle}>
                  Important people and facts
                </Typography>
              </a>

              <div className={s.search}>
                <div title="Google search form" className="gcse-search"></div>
              </div>
            </Container>
          </AppBar>

          <Component {...pageProps} />

          <Container maxWidth="md" className={s.footerContainer}>
            <Divider />
            <footer className={s.footer}>
              <div className={s.footerImage}>
                <Image
                  width={50}
                  height={50}
                  alt="Hollowverse"
                  src="/images/icons/letter-logo.png"
                />
              </div>
              <div className={s.footerItems}>
                <div>
                  <Typography variant="h4" component="p">
                    <Image
                      src="/images/icons/info-circle.svg"
                      width="15"
                      height="15"
                      alt="Info"
                    />{' '}
                    About
                  </Typography>

                  <Typography variant="body1">
                    Hollowverse is about the important people and their beliefs.
                  </Typography>
                </div>

                <div>
                  <Typography variant="h4" component="p">
                    <Image
                      src="/images/icons/comment-dots.svg"
                      width="15"
                      height="15"
                      alt="Comment"
                    />{' '}
                    Contact
                  </Typography>

                  <Typography variant="body1">
                    <Link
                      rel="noopener"
                      href="https://discuss.hollowverse.com/signup"
                      target="_blank"
                      color="inherit"
                    >
                      Log-in
                    </Link>{' '}
                    to our discussion forum and send us a{' '}
                    <Link
                      rel="noopener"
                      href="https://discuss.hollowverse.com/g/admins"
                      target="_blank"
                      color="inherit"
                    >
                      private message
                    </Link>
                    .
                  </Typography>
                </div>

                <div>
                  <Typography variant="h4" component="p">
                    <Image
                      src="/images/icons/gift.svg"
                      width="15"
                      height="15"
                      alt="Gift"
                    />{' '}
                    Copyrights
                  </Typography>

                  <Typography variant="body1">
                    We reserve none. Everything here is free, including{' '}
                    <Link
                      href="https://github.com/hollowverse/"
                      target="_blank"
                      color="inherit"
                      rel="noopener"
                    >
                      the code
                    </Link>
                    .
                  </Typography>
                </div>
              </div>
            </footer>
            <div style={{ marginTop: '100px' }} />
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </React.StrictMode>
  );
};
