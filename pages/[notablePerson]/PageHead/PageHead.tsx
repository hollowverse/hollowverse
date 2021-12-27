import React from 'react';
import Head from 'next/head';
import { NotablePersonProps } from '_r/pages/[notablePerson].page';

export const PageHead = (p: NotablePersonProps) => (
  <Head>
    <title>
      {p.notablePersonYaml.name}&apos;s religion and political view |
      Hollowverse
    </title>
    {p.notablePersonMd?.data?.summaries && (
      <meta
        name="description"
        content={`Religion: ${p.notablePersonMd.data.summaries.religion}; political views: ${p.notablePersonMd.data.summaries.politicalViews}`}
      />
    )}
    <link rel="canonical" href={`https://hollowverse.com/${p.slug}`} />
  </Head>
);
