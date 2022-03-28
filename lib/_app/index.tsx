import { CacheProvider, EmotionCache } from '@emotion/react';
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from '@mui/material';
import { AppProps } from 'next/app';
import 'normalize.css';
import React from 'react';
import { createEmotionCache } from '~/src/components/createEmotionCache';
import { StaticPropsContextProvider } from '~/src/components/StaticPropsContextProvider';
import { AppBar } from '~/src/_app/AppBar/AppBar';
import { Footer } from '~/src/_app/Footer/Footer';
import { Head } from '~/src/_app/Head/Head';
import { theme } from '~/src/_app/theme';

const clientSideEmotionCache = createEmotionCache();

export const App = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps & { emotionCache: EmotionCache }) => {
  return (
    <CacheProvider value={emotionCache}>
      <Head />
      <ThemeProvider theme={unstable_createMuiStrictModeTheme(theme)}>
        <StaticPropsContextProvider value={pageProps}>
          <AppBar />
          <Component {...pageProps} />
          <Footer />
        </StaticPropsContextProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};
