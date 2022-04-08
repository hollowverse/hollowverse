import { Chip, Container, Typography } from '@mui/material';
import React from 'react';
import { useCelebContext } from '~/lib/components/StaticPropsContextProvider';
import s from './styles.module.scss';

export const TagCollection = () => {
  const tags = useCelebContext().celeb.tags!;

  return (
    <Container className={s.TagCollection}>
      <Container>
        {tags.regular.map((t) => (
          <Chip
            key={t.tag.name}
            label={t.tag.name}
            className={s.tag}
            variant="outlined"
          />
        ))}
      </Container>

      {tags.lowConfidence.length > 0 && (
        <Container className={s.lowConfidence}>
          <Typography variant="h3" className={s.tag} display="inline">
            Maybe
          </Typography>
          {tags.lowConfidence.map((t) => (
            <Chip
              key={t.tag.name}
              label={t.tag.name}
              className={s.tag}
              variant="outlined"
            />
          ))}
        </Container>
      )}
    </Container>
  );

  // return <pre>{JSON.stringify(tags, null, 2)}</pre>;
};
