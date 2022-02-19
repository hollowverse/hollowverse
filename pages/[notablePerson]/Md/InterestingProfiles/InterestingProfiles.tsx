import { Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { Separator } from '~/components/Separator';
import { useNotablePersonContext } from '~/components/StaticPropsContextProvider';
import s from './InterestingProfiles.module.scss';

export const InterestingProfiles = () => {
  const context = useNotablePersonContext();
  const relatedPeople = context.notablePersonMd.data.relatedPeople;

  return (
    <div className={s.InterestingProfiles}>
      <Separator title="Other interesting profiles" />

      <div className={s.content}>
        {relatedPeople.map((notablePersonData) => {
          return (
            <a
              className={s.link}
              href={`/${notablePersonData.slug}`}
              key={notablePersonData.slug}
            >
              <span className={s.image}>
                <Image
                  objectFit="cover"
                  objectPosition="top"
                  src={
                    notablePersonData.pic || '/images/avatar-placeholder.png'
                  }
                  alt={notablePersonData.name}
                  layout="fixed"
                  width={160}
                  height={200}
                  className={s.image}
                />
              </span>
              <Typography
                fontWeight={500}
                variant="h4"
                component="p"
                className={s.name}
              >
                {notablePersonData.name}
              </Typography>
            </a>
          );
        })}
      </div>
    </div>
  );
};
