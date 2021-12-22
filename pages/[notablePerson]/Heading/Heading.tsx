import 'normalize.css';

import React from 'react';
import s from '../notablePerson.module.scss';
import { Typography, Container, Button } from '@mui/material';
import { Attribute } from '_r/pages/[notablePerson]/Attribute/Attribute';
import { TAttribute, TNotablePersonData, TPic } from '_r/pages/common/types';
import Image from 'next/image';
import { differenceInCalendarYears, parse } from 'date-fns';
import { EditButton } from '../common/EditButton/EditButton';

export const Heading = (p: {
  data: TNotablePersonData;
  pic: TPic;
  attributes: TAttribute[];
}) => {
  return (
    <header>
      <div className={s.notablePersonHeading}>
        <div className={s.notablePersonImageContainer}>
          <Image
            src={p.pic}
            width={150}
            height={150}
            priority
            alt={p.data.name}
          />
        </div>

        <Typography variant="h1" className={s.pageTitle}>
          <span className={s.pageTitleLessEmphasized}>
            Religion, politics, and ideas of
          </span>
          <br /> <span className={s.notablePersonName}>{p.data.name}</span>
        </Typography>
      </div>

      <ul className={s.attributesContainer}>
        {p.attributes.map(({ text, icon, alt }) => (
          <Attribute key={text} text={text} icon={icon} alt={alt} />
        ))}

        <Attribute
          text={`${differenceInCalendarYears(
            new Date(),
            parse(p.data.born, 'MM-dd-yyyy', new Date()),
          )} years old`}
          icon="hourglass"
          alt="Hourglass"
        />
      </ul>

      <div style={{ zIndex: 1, position: 'relative' }}>
        <EditButton data={p.data} type="tag" />
      </div>
    </header>
  );
};
