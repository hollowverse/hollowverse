import { Typography } from '@mui/material';
import React from 'react';
import { Separator } from '~/components/Separator';
import s from './AddFactButton.module.scss';

export const AddFactButton = () => (
  <div className={s.HelpUs}>
    <Separator title="Help us get the facts" className={s.separator} />

    <Typography>
      Did Alyson Hannigan say or do something that reveals her religion or
      political views recently?
    </Typography>

    <Typography>Let everyone know and add it to this page!</Typography>
  </div>
);
