import React from 'react';
import s from './InterestingProfiles.module.scss';
import { TNotablePersonMd } from '_r/pages/common/types';
import { Typography } from '@mui/material';
import Image from 'next/image';
import { Icon } from '_r/pages/common/Icon';
import StarsIcon from '_i/icons/stars.svg';

export const InterestingProfiles = (p: {
  relatedPeople: TNotablePersonMd['data']['relatedPeople'];
}) => {
  return (
    <div className={s.InterestingProfiles}>
      <Typography variant="h1" component="h3">
        <Icon component={StarsIcon} />
        Other interesting profiles
      </Typography>

      <div className={s.content}>
        {p.relatedPeople.map((notablePersonData) => {
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
