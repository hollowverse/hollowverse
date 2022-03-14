import {
  StyledEngineProvider,
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from '@mui/material';
import { AppProps } from 'next/app';
import 'normalize.css';
import React from 'react';
import { StaticPropsContextProvider } from '~/components/StaticPropsContextProvider';
import { theme } from '~/pages/common/theme';
import { Footer } from '~/components/Footer/Footer';
import '~/components/globalStyles.css';
import { Head } from '~/components/Head/Head';
import { AppBar } from '~/components/AppBar/AppBar';

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
