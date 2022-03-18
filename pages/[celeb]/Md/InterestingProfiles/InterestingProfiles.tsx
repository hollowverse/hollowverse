import { Container, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { Separator } from '~/pages/components/Separator';
import { useCelebContext } from '~/pages/components/StaticPropsContextProvider';
import s from './InterestingProfiles.module.scss';

export const InterestingProfiles = () => {
  const context = useCelebContext();
  const relatedPeople = context.celebMd.data.relatedPeople;

  return (
    <div className={s.InterestingProfiles}>
      <Separator title="Other interesting profiles" />

      <Container maxWidth="md" className={s.content}>
        {relatedPeople.map((celebData) => {
          return (
            <a
              className={s.link}
              href={`/${celebData.slug}`}
              key={celebData.slug}
            >
              <span className={s.image}>
                <Image
                  objectFit="cover"
                  objectPosition="top"
                  src={celebData.pic || '/images/avatar-placeholder.png'}
                  alt={celebData.name}
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
                {celebData.name}
              </Typography>
            </a>
          );
        })}
      </Container>
    </div>
  );
};
