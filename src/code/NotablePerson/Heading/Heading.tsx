import 'normalize.css';

import React from 'react';
import * as s from '../notablePerson.module.scss';
import { Typography, Container } from '@mui/material';
import { Attribute } from '_c/Attribute/Attribute';
import { NotablePersonData, Pic } from '_c/types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

export const Heading = (p: { yml: NotablePersonData; pic: Pic }) => {
  const pic = getImage(p.pic)!;

  return (
    <>
      <div className={s.notablePersonHeading}>
        <GatsbyImage
          image={pic}
          alt={p.yml.name}
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
