import { Container } from '@mui/material';
import Script from 'next/script';
import React from 'react';
import { Separator } from '~/components/Separator';
import { useNotablePersonContext } from '~/components/StaticPropsContextProvider';
import s from './Discussion.module.scss';

export const Discussion = () => {
  const context = useNotablePersonContext();

  return (
    <Container
      maxWidth="md"
      component="section"
      className={s.Discussion}
      disableGutters
      id="discussion"
    >
      <Script
        id="discourse-embed"
        dangerouslySetInnerHTML={{
          __html: `
          DiscourseEmbed = { discourseUrl: 'https://discuss.hollowverse.com/',
          topicId: '${context.notablePersonYaml.discourseTopicId}' };
          (function() {
            var d = document.createElement('script'); d.type = 'text/javascript'; d.async = true;
            d.src = DiscourseEmbed.discourseUrl + 'javascripts/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(d);
          })();
        `,
        }}
      />
      <Separator title="Discussion" />

      <div className={s.element} id="discourse-comments" title="Comments" />
    </Container>
  );
};
