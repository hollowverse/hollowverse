import { Container } from '@mui/material';
import Script from 'next/script';
import React from 'react';
import { Separator } from '~/pages/components/Separator';
import { useCelebContext } from '~/pages/components/StaticPropsContextProvider';
import s from './Discussion.module.scss';

export const Discussion = () => {
  const context = useCelebContext();

  return (
    <section className={s.Discussion} id="discussion">
      <Script
        id="discourse-embed"
        dangerouslySetInnerHTML={{
          __html: `
          DiscourseEmbed = { discourseUrl: 'https://discuss.hollowverse.com/',
          topicId: '${context.celebYaml.discourseTopicId}' };
          (function() {
            var d = document.createElement('script'); d.type = 'text/javascript'; d.async = true;
            d.src = DiscourseEmbed.discourseUrl + 'javascripts/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(d);
          })();
        `,
        }}
      />
      <Separator title="Discussion" />

      <Container
        maxWidth="md"
        className={s.element}
        id="discourse-comments"
        title="Comments"
      />
    </section>
  );
};
