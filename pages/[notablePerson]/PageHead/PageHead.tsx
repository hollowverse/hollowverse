import Head from 'next/head';
import React from 'react';
import { useNotablePersonContext } from '~/pages/components/StaticPropsContextProvider';

export const PageHead = () => {
  const context = useNotablePersonContext();

  return (
    <Head>
      <title>
        {context.notablePersonYaml.name}&apos;s religion and political view |
        Hollowverse
      </title>
      {context.notablePersonMd?.data?.summaries && (
        <meta
          name="description"
          content={`Religion: ${context.notablePersonMd.data.summaries.religion}; political views: ${context.notablePersonMd.data.summaries.politicalViews}`}
        />
      )}
      <link rel="canonical" href={`https://hollowverse.com/${context.slug}`} />
    </Head>
  );
};
