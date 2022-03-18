import Head from 'next/head';
import React from 'react';
import { useCelebContext } from '~/pages/components/StaticPropsContextProvider';

export const PageHead = () => {
  const context = useCelebContext();

  return (
    <Head>
      <title>
        {context.celeb.name}&apos;s religion and political view | Hollowverse
      </title>
      {context.celebOldContent?.summaries && (
        <meta
          name="description"
          content={`Religion: ${context.celebOldContent.summaries.religion}; political views: ${context.celebOldContent.summaries.politicalViews}`}
        />
      )}
      <link rel="canonical" href={`https://hollowverse.com/${context.slug}`} />
    </Head>
  );
};
