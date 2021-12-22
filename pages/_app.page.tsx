import {
  AppBar,
  Container,
  Divider,
  IconButton,
  StyledEngineProvider,
  ThemeProvider,
  Typography,
  unstable_createMuiStrictModeTheme,
} from '@mui/material';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import React, { useState } from 'react';
import { Footer } from '_r/pages/_app/Footer/Footer';
import { theme } from '_r/pages/common/theme';
import './_app/globalStyles.css';
import s from './_app/_app.module.scss';
import { Icon } from './common/Icon';
import SearchIcon from '_i/icons/search-regular.svg';
import TimesIcon from '_i/icons/times-regular.svg';

export default ({ Component, pageProps }: AppProps) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={unstable_createMuiStrictModeTheme(theme)}>
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
              <div className={s.logo}>
                <div style={{ display: showSearch ? 'block' : 'none' }}>
                  <div title="Google search results" className="gcse-search" />
                </div>

                <div style={{ display: showSearch ? 'none' : 'block' }}>
                  <a href="/">
                    <Image
                      src="/images/logo.svg"
                      width={250}
                      height={30}
                      alt="Hollowverse"
                    />
                    <Typography variant="body2" className={s.logoSubtitle}>
                      Important people and facts
                    </Typography>
                  </a>
                </div>
              </div>

              <div className={s.search}>
                <IconButton
                  aria-label="Search"
                  onClick={() => setShowSearch(!showSearch)}
                  style={{ opacity: showSearch ? 0.5 : 1 }}
                >
                  <Icon
                    component={showSearch ? TimesIcon : SearchIcon}
                    fontSize="large"
                  ></Icon>
                </IconButton>
              </div>
            </Container>
          </AppBar>

          <Component {...pageProps} />

          <Container maxWidth="md" className={s.footerContainer}>
            <Divider />
            <Footer />
            <div style={{ marginTop: '100px' }} />
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </React.StrictMode>
  );
};
