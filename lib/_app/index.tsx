import { CacheProvider, EmotionCache } from '@emotion/react';
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from '@mui/material';
import { AppProps } from 'next/app';
import 'normalize.css';
import React from 'react';
import { createEmotionCache } from '~/lib/components/createEmotionCache';
import { StaticPropsContextProvider } from '~/lib/components/StaticPropsContextProvider';
import { AppBar } from '~/lib/_app/AppBar/AppBar';
import { Footer } from '~/lib/_app/Footer/Footer';
import { Head } from '~/lib/_app/Head/Head';
import { theme } from '~/lib/_app/theme';

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
