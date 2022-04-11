import { Container, Typography } from '@mui/material';
import React from 'react';
import s from './styles.module.scss';
import clsx from 'clsx';

export const Separator: React.FC<{
  title?: string;
  className?: string;
  minor?: boolean;
}> = (p) => {
  const minor = p.minor || false;

  return (
    <Container
      maxWidth="md"
      disableGutters
      className={clsx(s.Separator, p.className, minor ? s.minor : s.major)}
    >
      {p.title && (
        <Typography
          variant="h3"
          component="h2"
          fontWeight={500}
          className={s.title}
        >
          {p.title}
        </Typography>
      )}
    </Container>
  );
};
