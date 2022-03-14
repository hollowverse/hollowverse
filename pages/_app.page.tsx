import {
  StyledEngineProvider,
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from '@mui/material';
import { AppProps } from 'next/app';
import 'normalize.css';
import React from 'react';
import { StaticPropsContextProvider } from '~/pages/components/StaticPropsContextProvider';
import { theme } from '~/pages/_app/theme';
import { Footer } from '~/pages/_app/Footer/Footer';
import '~/pages/_app/globalStyles.css';
import { Head } from '~/pages/_app/Head/Head';
import { AppBar } from '~/pages/_app/AppBar/AppBar';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={unstable_createMuiStrictModeTheme(theme)}>
          <StaticPropsContextProvider value={pageProps}>
            <Head />
            <AppBar />
            <Component {...pageProps} />
            <Footer />
          </StaticPropsContextProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </React.StrictMode>
  );
};

export default App;
