import 'normalize.css';

import React from 'react';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import logo from '_i/logo.svg';
import * as s from './notablePerson.module.scss';
import { Avatar, Divider, ThemeProvider, Typography } from '@mui/material';
import {
  unstable_createMuiStrictModeTheme,
  StyledEngineProvider,
} from '@mui/material/styles';
import { theme } from '_c/theme';
import { Attribute } from '_c/Attribute/Attribute';
import { NotablePersonYml, Pic } from '_c/types';
import quote from '_i/icons/quote.svg';
import pen from '_i/icons/pen.svg';

export default (p: { yml: NotablePersonYml; pic: Pic; editorial: string }) => {
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
              <div className={s.notablePersonHeading}>
                <img
                  src={p.pic}
                  className={s.notablePersonMainImage}
                  alt={p.yml.name}
                />
                <Typography variant="h1" className={s.pageTitle}>
                  <span className={s.pageTitleLessEmphasized}>
                    Religion, politics, and ideas of
                  </span>
                  <br />{' '}
                  <span className={s.notablePersonName}>{p.yml.name}</span>
                </Typography>
              </div>

              <Container maxWidth="sm" className={s.attributesContainer}>
                {p.yml.attributes.map((label) => (
                  <Attribute key={label} label={label} />
                ))}
              </Container>
            </Container>

            <div className={s.quotesContainer}>
              <Typography variant="h1" component="h2">
                <img width="25" src={quote} alt="Quote" />
                <span style={{ marginLeft: '10px' }}>Quotes</span>
              </Typography>

              {p.yml.quotes.map((quote, i) => (
                <div className={s.quoteBlock} key={i}>
                  <Typography
                    variant="h4"
                    component="p"
                    className={s.quoteContext}
                  >
                    {quote[0]}
                  </Typography>

                  <div className={s.quoteTextContainer}>
                    <div>
                      <Avatar src={p.pic}></Avatar>
                    </div>
                    <div className={s.quoteText}>
                      <Typography variant="h2" component="p">
                        {quote[1]}
                      </Typography>
                    </div>
                  </div>

                  {i != p.yml.quotes.length - 1 && <Divider />}
                </div>
              ))}
            </div>

            <div className={s.editorialContainer}>
              <Typography variant="h1" component="h2">
                <img width="25" src={pen} alt="Pen" />
                <span style={{ marginLeft: '10px' }}>Editorial</span>
              </Typography>

              <div
                className={s.editorialContent}
                dangerouslySetInnerHTML={{ __html: p.editorial }}
              ></div>
            </div>
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </React.StrictMode>
  );
};
