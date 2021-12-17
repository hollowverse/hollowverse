import 'normalize.css';

import React from 'react';
import logo from '_i/logo.svg';
import s from './notablePerson.module.scss';
import { ThemeProvider, Typography, Container, AppBar } from '@mui/material';
import {
  unstable_createMuiStrictModeTheme,
  StyledEngineProvider,
} from '@mui/material/styles';
import { theme } from '_l/theme';
import {
  InterestingProfiles as InterestingProfilesType,
  NotablePersonData,
  Pic,
} from '_l/types';
import { Heading } from './Heading/Heading';
import { Quotes } from './Quotes/Quotes';
import { Editorial } from './Editorial/Editorial';
import { useInjectScript } from '_l/useInjectScript';
import Head from 'next/head';
import Image from 'next/image';

const NotablePerson = (p: {
  data: NotablePersonData;
  pic: Pic;
  editorial: string;
  interestingProfiles: InterestingProfilesType;
}) => {
  useInjectScript('https://cse.google.com/cse.js?cx=b70c7f6ba6a334ff2');

  return (
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={unstable_createMuiStrictModeTheme(theme)}>
          <Head>
            <meta charSet="utf-8" />
            <title>
              {p.data.name}'s religion and political view | Hollowverse
            </title>
            <meta
              name="description"
              content={`${p.data.name}: ${p.data.attributes.join(', ')}`}
            ></meta>
            <link
              rel="canonical"
              href={`https://hollowverse.com/${p.data.slug}`}
            />
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
                {/* <img src={logo} alt="Hollowverse" style={{ width: 200 }}></img> */}
                <Typography variant="body2" className={s.logoSubtitle}>
                  Important people and facts
                </Typography>
              </a>

              <div className={s.search}>
                <div className="gcse-search"></div>
              </div>
            </Container>
          </AppBar>

          <Container maxWidth="md">
            <Container className={s.fancyBackgroundContainer}>
              <Heading yml={p.data} pic={p.pic} />
            </Container>

            <div className={s.quotesContainer}>
              <Quotes data={p.data} pic={p.pic} />
            </div>

            {p.editorial && p.data['editorial-sources'] && (
              <div className={s.editorialContainer}>
                <Editorial
                  editorial={p.editorial}
                  sources={p.data['editorial-sources']}
                  interestingProfiles={p.interestingProfiles}
                />
              </div>
            )}
          </Container>

          <div style={{ marginTop: '100px' }} />
        </ThemeProvider>
      </StyledEngineProvider>
    </React.StrictMode>
  );
};

export default NotablePerson;
