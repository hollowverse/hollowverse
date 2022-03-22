import { CacheProvider, EmotionCache } from '@emotion/react';
import {
  StyledEngineProvider,
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from '@mui/material';
import { AppProps } from 'next/app';
import 'normalize.css';
import React from 'react';
import { createEmotionCache } from '~/pages/components/createEmotionCache';
import { StaticPropsContextProvider } from '~/pages/components/StaticPropsContextProvider';
import { AppBar } from '~/pages/_app/AppBar/AppBar';
import { Footer } from '~/pages/_app/Footer/Footer';
import '~/pages/_app/globalStyles.css';
import { Head } from '~/pages/_app/Head/Head';
import { theme } from '~/pages/_app/theme';

const clientSideEmotionCache = createEmotionCache();

const App = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps & { emotionCache: EmotionCache }) => {
  return (
    <React.StrictMode>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={unstable_createMuiStrictModeTheme(theme)}>
          <StaticPropsContextProvider value={pageProps}>
            <Head />
            <AppBar />
            <Component {...pageProps} />
            <Footer />
          </StaticPropsContextProvider>
        </ThemeProvider>
      </CacheProvider>
    </React.StrictMode>
  );
};

export default App;
