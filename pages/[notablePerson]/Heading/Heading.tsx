import { Typography } from '@mui/material';
import Image from 'next/image';
import 'normalize.css';
import React from 'react';
import { TNotablePersonYaml, TPic } from '_r/pages/common/types';
import s from '../notablePerson.module.scss';

export const Heading = (props: {
  notablePersonYaml: TNotablePersonYaml;
  pic: TPic;
}) => {
  return (
    <header>
      <div className={s.notablePersonHeading}>
        <div className={s.notablePersonImageContainer}>
          <Image
            className={s.notablePersonImage}
            src={props.pic ? props.pic : '/images/avatar-placeholder.png'}
            width={200}
            height={250}
            priority
            alt={props.notablePersonYaml.name}
          />
        </div>

        <Typography variant="h1" className={s.pageTitle}>
          <span className={s.pageTitleLessEmphasized}>
            Religion, politics, and ideas of
          </span>
          <br />{' '}
          <span className={s.notablePersonName}>
            {props.notablePersonYaml.name}
          </span>
        </Typography>
      </div>
    </header>
  );
};
