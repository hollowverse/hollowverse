import { Container, Typography } from '@mui/material';
import Head from 'next/head';
import Script from 'next/script';
import 'normalize.css';
import React from 'react';
import CommentsAlt from '_i/icons/comments-alt.svg';
import { Icon } from '_r/pages/common/Icon';
import { TEditorial, TNotablePersonData, TPic } from '_r/pages/common/types';
import { Editorial } from './[notablePerson]/Editorial/Editorial';
import { Heading } from './[notablePerson]/Heading/Heading';
import s from './[notablePerson]/notablePerson.module.scss';
import { Quotes } from './[notablePerson]/Quotes/Quotes';

export default (p: {
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
          <Typography variant="h1" component="h2">
            <Icon component={CommentsAlt} />
            <span style={{ marginLeft: 5 }}>
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

export { getStaticProps } from './[notablePerson]/getStaticProps';
export { getStaticPaths } from './[notablePerson]/getStaticPaths';
