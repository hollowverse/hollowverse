import 'normalize.css';

import React from 'react';
import * as s from '../notablePerson.module.scss';
import { Typography, Container } from '@mui/material';
import { Attribute } from '_s/lib/Attribute/Attribute';
import { NotablePersonData, Pic } from '_s/lib/types';
import Image from 'next/image';

export const Heading = (p: { yml: NotablePersonData; pic: Pic }) => {
  return (
    <>
      <div className={s.notablePersonHeading}>
        <Image
          src={p.pic}
          width={150}
          height={150}
          className={s.notablePersonMainImage}
        />
        <Typography variant="h1" className={s.pageTitle}>
          <span className={s.pageTitleLessEmphasized}>
            Religion, politics, and ideas of
          </span>
          <br /> <span className={s.notablePersonName}>{p.yml.name}</span>
        </Typography>
      </div>

      <Container maxWidth="sm" className={s.attributesContainer}>
        {p.yml.attributes.map((label) => (
          <Attribute key={label} label={label} />
        ))}
      </Container>
    </>
  );
};
