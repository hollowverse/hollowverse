import 'normalize.css';

import React from 'react';
import * as s from '../notablePerson.module.scss';
import { Typography, Container } from '@mui/material';
import { Attribute } from '_c/Attribute/Attribute';
import { NotablePersonYml, Pic } from '_c/types';

export const Heading = (p: { yml: NotablePersonYml; pic: Pic }) => {
  return (
    <>
      <div className={s.notablePersonHeading}>
        <img
          src={p.pic}
          className={s.notablePersonMainImage}
          alt={p.yml.name}
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
