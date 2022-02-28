import { Container, Typography } from '@mui/material';
import React from 'react';
import s from './Separator.module.scss';
import clsx from 'clsx';

export const Separator: React.FC<{ title?: string; className?: string }> = (
  p,
) => (
  <div className={clsx(s.Separator, p.className)}>
    <Container maxWidth="md" disableGutters>
      {p.title && (
        <Typography variant="h3" fontWeight={500} className={s.title}>
          {p.title}
        </Typography>
      )}
    </Container>
  </div>
);
