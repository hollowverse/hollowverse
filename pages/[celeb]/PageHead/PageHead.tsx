import Head from 'next/head';
import React from 'react';
import { useCelebContext } from '~/pages/components/StaticPropsContextProvider';

export const PageHead = () => {
  const context = useCelebContext();

  return (
    <Head>
      <title>
        {context.celebYaml.name}&apos;s religion and political view |
        Hollowverse
      </title>
      {context.celebMd?.data?.summaries && (
        <meta
          name="description"
          content={`Religion: ${context.celebMd.data.summaries.religion}; political views: ${context.celebMd.data.summaries.politicalViews}`}
        />
      )}
      <link rel="canonical" href={`https://hollowverse.com/${context.slug}`} />
    </Head>
  );
};
