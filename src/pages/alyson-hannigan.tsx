import 'normalize.css';

import React from 'react';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
// @ts-ignore
import logo from '../images/logo.svg';
// @ts-ignore
import alysonHannigan from '../images/notable/alyson-hannigan.jpg';
// @ts-ignore
import * as styles from '../style.module.css';
import { Chip, Stack, ThemeProvider, Typography } from '@mui/material';
import { unstable_createMuiStrictModeTheme } from '@mui/material/styles';
import { theme } from '../theme';
import clsx from 'clsx';
import { Attribute } from '../Attribute';
// @ts-ignore
import alysonHanniganYml from '../person/alyson-hannigan.yml';

export default () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={unstable_createMuiStrictModeTheme(theme)}>
        <AppBar
          elevation={1}
          color="transparent"
          position="static"
          className={clsx(styles.displayFlex)}
        >
          <Container
            maxWidth="md"
            className={clsx(styles.marginTop5, styles.marginBottom5)}
          >
            <img src={logo} alt="Hollowverse" style={{ width: 300 }}></img>
            <Typography variant="body2" className={clsx(styles.colorGray700)}>
              Important people and facts
            </Typography>
          </Container>
        </AppBar>

        <Container maxWidth="md">
          <div
            className={clsx(
              styles.displayFlex,
              styles.justifyContentCenter,
              styles.marginTop5,
              styles.personDetailsCover,
            )}
          >
            <div>
              <img
                src={alysonHannigan}
                style={{ width: 150, borderRadius: '50%' }}
                alt="Alyson Hannigan"
              />
            </div>
            <div className={clsx(styles.marginLeft3, styles.marginTop10)}>
              <Typography variant="h1">
                <span
                  style={{ fontSize: '50%' }}
                  className={clsx(
                    styles.colorGray700,
                    styles.textTransformUppercase,
                  )}
                >
                  Religion, politics, and ideas of
                </span>
                <br /> {alysonHanniganYml.name}
              </Typography>
            </div>
          </div>

          <div
            className={clsx(
              styles.displayFlex,
              styles.justifyContentCenter,
              styles.marginTop5,
              styles.flexWrapWrap,
            )}
          >
            {alysonHanniganYml.attributes.map((label) => (
              <Attribute key={label} label={label} />
            ))}
          </div>

          <div className={clsx(styles.marginTop5)}>
            <Typography variant="h2">Quotes</Typography>
          </div>
        </Container>
      </ThemeProvider>
    </React.StrictMode>
  );
};
