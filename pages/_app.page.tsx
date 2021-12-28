import {
  StyledEngineProvider,
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from '@mui/material';
import { AppProps } from 'next/app';
import React from 'react';
import { theme } from '~/pages/common/theme';
import { Footer } from '~/pages/_app/Footer/Footer';
import '~/pages/_app/globalStyles.css';
import { Head } from '~/pages/_app/Head/Head';
import { AppBar } from './_app/AppBar/AppBar';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={unstable_createMuiStrictModeTheme(theme)}>
          <Head />
          <AppBar />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </StyledEngineProvider>
    </React.StrictMode>
  );
};

export default App;
