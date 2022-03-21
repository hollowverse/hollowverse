import { Container, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { sanityImage } from '~/pages/components/sanityio';
import { Separator } from '~/pages/components/Separator';
import { useCelebContext } from '~/pages/components/StaticPropsContextProvider';
import s from './InterestingProfiles.module.scss';

export const InterestingProfiles = () => {
  const context = useCelebContext();
  const relatedPeople = context.celebOldContent.relatedPeople;

  return (
    <div className={s.InterestingProfiles}>
      <Separator title="Other interesting profiles" />

      <Container maxWidth="md" className={s.content}>
        {relatedPeople.map((celebData) => {
          const picture = celebData.picture || context.placeholderImage;

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
                  blurDataURL={picture.metadata.lqip}
                  placeholder="blur"
                  src={sanityImage(picture).width(200).height(250).url()}
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
