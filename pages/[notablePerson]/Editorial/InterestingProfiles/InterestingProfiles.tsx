import React from 'react';
import s from '../../notablePerson.module.scss';
import { TEditorial } from '_r/pages/common/types';
import { Typography } from '@mui/material';
import Image from 'next/image';

export const InterestingProfiles = (p: {
  interestingProfiles: TEditorial['data']['interestingProfiles'];
}) => {
  return (
    <>
      {p.interestingProfiles.map((notablePersonData) => {
        return (
          <a
            className={s.interestingProfile}
            href={`/${notablePersonData.slug}`}
            key={notablePersonData.id}
          >
            <span className={s.interestingProfileImageContainer}>
              <Image
                objectFit="cover"
                objectPosition="top"
                src={`/images/notablePeople/${notablePersonData.id}.jpg`}
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
