import 'normalize.css';

import React from 'react';
import logo from '_i/logo.svg';
import * as s from './notablePerson.module.scss';
import { ThemeProvider, Typography, Container, AppBar } from '@mui/material';
import {
  unstable_createMuiStrictModeTheme,
  StyledEngineProvider,
} from '@mui/material/styles';
import { theme } from 'src/components/theme';
import { NotablePersonYml, Pic } from 'src/components/types';
import { Heading } from './Heading/Heading';
import { Quotes } from './Quotes/Quotes';
import { Editorial } from './Editorial/Editorial';
import { StaticImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';

// { yml: NotablePersonYml; pic: Pic; editorial: string }

const NotablePerson = (p: any) => {
  return (
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={unstable_createMuiStrictModeTheme(theme)}>
          <AppBar
            elevation={1}
            color="transparent"
            position="static"
            className={s.appBar}
          >
            <Container maxWidth="md" className={s.appBarContainer}>
              <img src={logo} alt="Hollowverse" style={{ width: 200 }}></img>
              <Typography variant="body2" className={s.logoSubtitle}>
                Important people and facts
              </Typography>
            </Container>
          </AppBar>

          <Container maxWidth="md">
            <Container className={s.fancyBackgroundContainer}>
              <Heading yml={p.yml} pic={p.pic} />
            </Container>

            <div className={s.quotesContainer}>
              <Quotes yml={p.yml} pic={p.pic} />
            </div>

            {p.editorial && p.yml['editorial-sources'] && (
              <div className={s.editorialContainer}>
                <Editorial
                  editorial={p.editorial}
                  sources={p.yml['editorial-sources']}
                />
              </div>
            )}
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </React.StrictMode>
  );
};

export default NotablePerson;
