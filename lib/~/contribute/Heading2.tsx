import { Grid, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import s from './styles.module.scss';

export const Heading2 = ({
  children,
  icon,
}: {
  children: string;
  icon: ReactElement;
}) => {
  return (
    <Grid container direction="row" alignItems="center" className={s.heading2}>
      <Grid item>{icon}</Grid>
      <Grid item className={s.heading2Text}>
        <Typography variant="h2">{children}</Typography>
      </Grid>
    </Grid>
  );
};
