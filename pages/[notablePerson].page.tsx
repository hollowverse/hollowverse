import { Container } from '@mui/material';
import Head from 'next/head';
import 'normalize.css';
import React from 'react';
import {
  TNotablePersonMd,
  TNotablePersonYaml,
  TPic,
  TSlug,
} from '_r/pages/common/types';
import { Editorial } from './[notablePerson]/Editorial/Editorial';
import { Heading } from './[notablePerson]/Heading/Heading';
import s from './[notablePerson]/notablePerson.module.scss';

const NotablePerson = (p: {
  notablePersonYaml: TNotablePersonYaml;
  pic: TPic;
  notablePersonMd: TNotablePersonMd;
  slug: TSlug;
}) => {
  return (
    <main>
      <Head>
        <title>
          {p.notablePersonYaml.name}&apos;s religion and political view |
          Hollowverse
        </title>
        {p.notablePersonMd.data?.summaries && (
          <meta
            name="description"
            content={`Religion: ${p.notablePersonMd.data.summaries.religion}; political views: ${p.notablePersonMd.data.summaries.politicalViews}`}
          ></meta>
        )}
        <link rel="canonical" href={`https://hollowverse.com/${p.slug}`} />
      </Head>

      <Container maxWidth="md" style={{ padding: 0 }}>
        <section className={s.fancyBackgroundContainer}>
          <Heading notablePersonYaml={p.notablePersonYaml} pic={p.pic} />
        </section>
      </Container>

      <Container maxWidth="md">
        {p.notablePersonMd && (
          <section className={s.editorialContainer}>
            <Editorial editorial={p.notablePersonMd} />
          </section>
        )}
      </Container>
    </main>
  );
};

export default NotablePerson;

export { getStaticProps } from './[notablePerson]/getStaticProps';
export { getStaticPaths } from './[notablePerson]/getStaticPaths';
