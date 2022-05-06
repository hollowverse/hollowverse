import { CacheProvider, EmotionCache } from '@emotion/react';
import { AppProps } from 'next/app';
import React from 'react';
import { createEmotionCache } from '~/lib/components/createEmotionCache';
import { StaticPropsContextProvider } from '~/lib/components/StaticPropsContextProvider';
import { AppBar } from '~/lib/_app/AppBar/AppBar';
import { Footer } from '~/lib/_app/Footer/Footer';
import { Head } from '~/lib/_app/Head/Head';

const clientSideEmotionCache = createEmotionCache();

export const App = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps & { emotionCache: EmotionCache }) => {
  return (
    <CacheProvider value={emotionCache}>
      <Head />
      <StaticPropsContextProvider value={pageProps}>
        <AppBar />
        <Component {...pageProps} />
        <Footer />
      </StaticPropsContextProvider>
    </CacheProvider>
  );
};
