import 'normalize.css';

import React from 'react';
import s from './notablePerson.module.scss';
import { Container, createSvgIcon, SvgIcon, Typography } from '@mui/material';
import { TEditorial, TNotablePersonData, TPic } from '_r/pages/common/types';
import { Heading } from './Heading/Heading';
import { Quotes } from './Quotes/Quotes';
import { Editorial } from './Editorial/Editorial';
import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image';
import CommentsAlt from '_i/icons/comments-alt.svg';
import { Icon } from '_r/pages/common/Icon';

const NotablePerson = (p: {
  data: TNotablePersonData;
  pic: TPic;
  editorial: TEditorial;
  attributes: any;
}) => {
  return (
    <main>
      <Script
        type="text/javascript"
        async={true}
        dangerouslySetInnerHTML={{
          __html: `
          DiscourseEmbed = { discourseUrl: 'https://discuss.hollowverse.com/',
          topicId: '${p.data['discourse-topic-id']}' };
      `,
        }}
      />
      <Script src="https://discuss.hollowverse.com/javascripts/embed.js"></Script>
      <Head>
        <title>{p.data.name}'s religion and political view | Hollowverse</title>
        <meta
          name="description"
          content={`${p.data.name}: ${p.data.attributes.join(', ')}`}
        ></meta>
        <link rel="canonical" href={`https://hollowverse.com/${p.data.id}`} />
      </Head>

      <Container maxWidth="md" style={{ padding: 0 }}>
        <section className={s.fancyBackgroundContainer}>
          <Heading data={p.data} pic={p.pic} attributes={p.attributes} />
        </section>
      </Container>

      <Container maxWidth="md">
        <section className={s.quotesContainer}>
          <Quotes data={p.data} pic={p.pic} />
        </section>

        {p.editorial && (
          <section className={s.editorialContainer}>
            <Editorial editorial={p.editorial} />
          </section>
        )}

        <section className={s.discussionContainer}>
          <Icon component={CommentsAlt as any} />
          <Typography variant="h1" component="h2">
            {/* <Image
              width={25}
              height={25}
              src="/images/icons/comments-alt.svg"
              alt="Comments"
            /> */}

            <span style={{ marginLeft: '10px' }}>
              Discuss the beliefs and ideas of {p.data.name}
            </span>
          </Typography>
          <div
            className={s.discourseElement}
            id="discourse-comments"
            title="Comments"
          ></div>
        </section>
      </Container>
    </main>
  );
};

export default NotablePerson;
