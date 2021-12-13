import React from 'react';
import { Chip } from '@mui/material';
import clsx from 'clsx';
// @ts-ignore
import * as styles from './style.module.css';

export const Attribute: React.FC<{
  label: string;
}> = (p) => {
  return (
    <Chip label={p.label} variant="outlined" className={clsx(styles.margin2)} />
  );
};
