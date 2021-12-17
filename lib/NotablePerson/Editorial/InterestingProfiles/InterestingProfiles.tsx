import React from 'react';
import * as s from '../../notablePerson.module.scss';
import { InterestingProfiles as InterestingProfilesType } from '_s/lib/types';
import { Typography } from '@mui/material';

export const InterestingProfiles = (p: {
  interestingProfiles: InterestingProfilesType;
}) => {
  return (
    <>
      {p.interestingProfiles.map(([data, pic]) => {
        return (
          <a
            className={s.interestingProfile}
            href={`/${data.slug}`}
            key={data.slug}
          >
            <div
              // image={getImage(pic)!}
              // alt={data.name}
              className={s.interestingProfileImage}
            />
            <Typography
              fontWeight={500}
              variant="h4"
              component="p"
              className={s.interestingProfileName}
            >
              {data.name}
            </Typography>
          </a>
        );
      })}
    </>
  );
};
