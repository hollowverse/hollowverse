import { Typography } from '@mui/material';
import { differenceInCalendarYears, parse } from 'date-fns';
import Image from 'next/image';
import 'normalize.css';
import React from 'react';
import { TTag, TNotablePersonData, TPic } from '_r/pages/common/types';
import { Tag } from '_r/pages/[notablePerson]/Tag/Tag';
import { EditButton } from '../common/EditButton/EditButton';
import s from '../notablePerson.module.scss';

export const Heading = (p: {
  data: TNotablePersonData;
  pic: TPic;
  tags: TTag[];
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

      <ul className={s.tagsContainer}>
        {p.tags.map(({ text, icon, alt }) => (
          <Tag key={text} text={text} icon={icon} alt={alt} />
        ))}

        <Tag
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
