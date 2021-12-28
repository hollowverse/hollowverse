import { Container, Typography } from '@mui/material';
import React from 'react';
import { Icon } from '~/pages/common/Icon';
import s from './Discussion.module.scss';
import CommentsAlt from '~/public/images/icons/comments-alt.svg';
import { NotablePersonProps } from '~/pages/[notablePerson].page';
import Script from 'next/script';

export const Discussion = (p: NotablePersonProps) => (
  <Container
    maxWidth="md"
    component="section"
    className={s.Discussion}
    id="discussion"
  >
    <Script
      id="discourse-embed"
      dangerouslySetInnerHTML={{
        __html: `
          DiscourseEmbed = { discourseUrl: 'https://discuss.hollowverse.com/',
          topicId: '${p.notablePersonYaml.discourseTopicId}' };
          (function() {
            var d = document.createElement('script'); d.type = 'text/javascript'; d.async = true;
            d.src = DiscourseEmbed.discourseUrl + 'javascripts/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(d);
          })();
        `,
      }}
    />
    <Typography variant="h2" component="h3" style={{ display: 'flex' }}>
      <Icon component={CommentsAlt} />
      <span style={{ marginLeft: 5 }}>
        Discuss the beliefs and ideas of {p.notablePersonYaml.name}
      </span>
    </Typography>

    <div className={s.element} id="discourse-comments" title="Comments" />
  </Container>
);
