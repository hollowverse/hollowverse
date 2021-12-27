import React from 'react';
import s from '../../notablePerson.module.scss';
import { TNotablePersonMd } from '_r/pages/common/types';
import { Typography } from '@mui/material';
import Image from 'next/image';

export const InterestingProfiles = (p: {
  relatedPeople: TNotablePersonMd['data']['relatedPeople'];
}) => {
  return (
    <>
      {p.relatedPeople.map((notablePersonData) => {
        return (
          <a
            className={s.interestingProfile}
            href={`/${notablePersonData.slug}`}
            key={notablePersonData.slug}
          >
            <span className={s.interestingProfileImageContainer}>
              <Image
                objectFit="cover"
                objectPosition="top"
                src={notablePersonData.pic || '/images/avatar-placeholder.png'}
                alt={notablePersonData.name}
                layout="fixed"
                width={160}
                height={200}
                className={s.interestingProfileImage}
              />
            </span>
            <Typography
              fontWeight={500}
              variant="h4"
              component="p"
              className={s.interestingProfileName}
            >
              {notablePersonData.name}
            </Typography>
          </a>
        );
      })}
    </>
  );
};
