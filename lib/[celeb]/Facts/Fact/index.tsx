import { Fact as TFact } from '~/lib/components/types';
import React from 'react';
import { Container, Typography } from '@mui/material';
import s from './styles.module.scss';
import clsx from 'clsx';
import { useCelebContext } from '~/lib/components/StaticPropsContextProvider';
import Link from '~/lib/components/Link';

export const Fact: React.FC<{ value: TFact }> = ({ value }) => {
  const {
    celeb: { name },
  } = useCelebContext();

  return (
    <Container maxWidth="md" className={s.Fact}>
      <div className={s.header}>
        <Typography>{value.date}</Typography>
      </div>

      <div className={s.body}>
        {(value.type === 'quote' && (
          <div className={s.quote}>
            <Typography className={s.context}>
              {value.context}, {name} said
            </Typography>

            <blockquote className={s.content}>
              <Typography>{value.quote}</Typography>
            </blockquote>
          </div>
        )) || (
          <div className={s.quote}>
            <Typography>{value.content}</Typography>
          </div>
        )}
      </div>
      <div className={s.tags}>
        {value.tags.map((t) => {
          return <Typography key={t.tag.name}># {t.tag.name}</Typography>;
        })}
      </div>

      <div className={s.footer}>
        <Link href={value.source}>Source</Link>
        <Link href={value.forumLink}>Forum link</Link>
      </div>
    </Container>
  );
};
