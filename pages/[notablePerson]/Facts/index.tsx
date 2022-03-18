import { Chip, Container, Typography } from '@mui/material';
import React from 'react';
import { Separator } from '~/pages/components/Separator';
import s from './styles.module.scss';
import clsx from 'clsx';

export const Facts = () => {
  return (
    <div className={s.Facts}>
      <Separator title="Religion" />

      <Container maxWidth="md" className={clsx(s.fact, s.backgroundFact)}>
        <Typography>
          According to an interview with The Guardian, he went to a Catholic
          secondary school
        </Typography>

        <div className={s.tags}>
          <Typography># Catholic background</Typography>
          <Typography># Possibly religious</Typography>
        </div>

        <div className={s.footer}>
          <Typography>Source</Typography>
          <Typography>Forum link</Typography>
        </div>
      </Container>

      <Separator minor />

      <Container maxWidth="md" className={clsx(s.fact, s.quote)}>
        <div className={s.header}>
          <Typography>April 16 2005</Typography>
        </div>

        <div className={s.body}>
          <Typography className={s.context}>
            In an interview with The Guardian, he said
          </Typography>

          <blockquote className={s.content}>
            <Typography>
              I&apos;m not a practising Catholic or I wouldn&apos;t be living
              unwed with a woman, and I don&apos;t think all poofs are going to
              hell, and I don&apos;t think everyone who&apos;s had an abortion
              is damned, most of my friends are atheists and I understand
              atheism, I get it, but I happen to be a theist. I believe in our
              answerableness to something else. You&apos;re not the only cunt in
              the world.
            </Typography>
          </blockquote>

          <div className={s.tags}>
            <Typography># Catholic background</Typography>
            <Typography># Possibly religious</Typography>
            <Typography># Theist</Typography>
          </div>

          <div className={s.footer}>
            <Typography>Source</Typography>
            <Typography>Forum link</Typography>
          </div>
        </div>
      </Container>

      <Separator title="Political Party Affiliation" />

      <Container maxWidth="md" className={clsx(s.fact, s.quote)}>
        <div className={s.header}>
          <Typography>August 13 2015</Typography>
        </div>

        <div className={s.body}>
          <Typography className={s.context}>
            In an interview about his support for the Labour party, about Jeremy
            Corbyn, Martin Freeman said
          </Typography>

          <blockquote className={s.content}>
            <Typography>
              I happen to think he is the most impressive one of the four
              [candidates]
            </Typography>

            <Typography>
              I respect all of them because I wouldn&apos;t do it and they are
              all on my team but he is the most impressive as an individual.
            </Typography>
          </blockquote>

          <div className={s.tags}>
            <Typography># Labour supporter</Typography>
            <Typography># Left leaning</Typography>
          </div>

          <div className={s.footer}>
            <Typography>Source</Typography>
            <Typography>Forum link</Typography>
          </div>
        </div>
      </Container>

      <Separator minor />

      <Container maxWidth="md" className={clsx(s.fact, s.quote)}>
        <div className={s.header}>
          <Typography>March 17 2015</Typography>
        </div>

        <div className={s.body}>
          <Typography className={s.context}>
            During the 2015 UK general election,
          </Typography>

          <blockquote className={s.content}>
            <Typography>
              Really, for me, there&apos;s only one choice, and I choose Labour
            </Typography>
          </blockquote>

          <div className={s.tags}>
            <Typography># Labour supporter</Typography>
            <Typography># Left leaning</Typography>
          </div>

          <div className={s.footer}>
            <Typography>Source</Typography>
            <Typography>Forum link</Typography>
          </div>
        </div>
      </Container>
    </div>
  );
};
