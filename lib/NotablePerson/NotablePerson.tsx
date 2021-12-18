import 'normalize.css';

import React from 'react';
import s from './notablePerson.module.scss';
import { Typography, Container, AppBar } from '@mui/material';
import { TEditorial, TNotablePersonData, TPic } from '_l/types';
import { Heading } from './Heading/Heading';
import { Quotes } from './Quotes/Quotes';
import { Editorial } from './Editorial/Editorial';
import Head from 'next/head';
import Image from 'next/image';

const NotablePerson = (p: {
  data: TNotablePersonData;
  pic: TPic;
  editorial: TEditorial;
}) => {
  return (
    <>
      <Head>
        <title>{p.data.name}'s religion and political view | Hollowverse</title>
        <meta
          name="description"
          content={`${p.data.name}: ${p.data.attributes.join(', ')}`}
        ></meta>
        <link rel="canonical" href={`https://hollowverse.com/${p.data.id}`} />
      </Head>

      <AppBar
        elevation={1}
        color="transparent"
        position="static"
        className={s.appBar}
      >
        <Container maxWidth="md" className={s.appBarContainer}>
          <a className={s.logo} href="/">
            <Image
              src="/images/logo.svg"
              width={200}
              height={20}
              alt="Hollowverse"
            />
            <Typography variant="body2" className={s.logoSubtitle}>
              Important people and facts
            </Typography>
          </a>

          <div className={s.search}>
            <div className="gcse-search"></div>
          </div>
        </Container>
      </AppBar>

      <Container maxWidth="md">
        <Container className={s.fancyBackgroundContainer}>
          <Heading data={p.data} pic={p.pic} />
        </Container>

        <div className={s.quotesContainer}>
          <Quotes data={p.data} pic={p.pic} />
        </div>

        {p.editorial && (
          <div className={s.editorialContainer}>
            <Editorial editorial={p.editorial} />
          </div>
        )}
      </Container>

      <div style={{ marginTop: '100px' }} />
    </>
  );
};

export default NotablePerson;
