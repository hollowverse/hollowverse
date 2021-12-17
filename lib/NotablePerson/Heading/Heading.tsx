import 'normalize.css';

import React from 'react';
import s from '../notablePerson.module.scss';
import { Typography, Container } from '@mui/material';
import { Attribute } from '_l/Attribute/Attribute';
import { TNotablePersonData, TPic } from '_l/types';
import Image from 'next/image';
import { differenceInCalendarYears, parse } from 'date-fns';

export const Heading = (p: { data: TNotablePersonData; pic: TPic }) => {
  return (
    <>
      <div className={s.notablePersonHeading}>
        <div className={s.notablePersonImageContainer}>
          <Image src={p.pic} width={150} height={150} priority />
        </div>
        <Typography variant="h1" className={s.pageTitle}>
          <span className={s.pageTitleLessEmphasized}>
            Religion, politics, and ideas of
          </span>
          <br /> <span className={s.notablePersonName}>{p.data.name}</span>
        </Typography>
      </div>

      <Container maxWidth="sm" className={s.attributesContainer}>
        {p.data.attributes.concat(p.data.occupations).map((label) => (
          <Attribute key={label} label={label} />
        ))}
        <Attribute
          label={`${differenceInCalendarYears(
            new Date(),
            parse(p.data.born, 'MM-dd-yyyy', new Date()),
          )} years old`}
        />
      </Container>
    </>
  );
};
