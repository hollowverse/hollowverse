import React from 'react';
import Image from 'next/image';
import { sanityImage } from '~/src/components/sanityio';
import { Typography } from '@mui/material';
import s from './styles.module.scss';
import { TCelebGalleryItem } from '~/src/components/types';
import { useCelebContext } from '~/src/components/StaticPropsContextProvider';

export const CelebGallery: React.FC<{
  celebGalleryItems: TCelebGalleryItem[];
}> = (p) => {
  const context = useCelebContext();

  return (
    <div className={s.CelebGallery}>
      {p.celebGalleryItems.map((celebData) => {
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
    </div>
  );
};
