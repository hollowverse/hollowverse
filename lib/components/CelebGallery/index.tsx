import React from 'react';
import Image from 'next/image';
import { sanityImage } from '~/lib/components/sanityio';
import { Typography } from '@mui/material';
import s from './styles.module.scss';
import { TCelebGalleryItem } from '~/lib/components/types';
import { useCelebContext } from '~/lib/components/StaticPropsContextProvider';

export const CelebGallery: React.FC<{
  celebGalleryItems: TCelebGalleryItem[];
}> = (p) => {
  const context = useCelebContext();

  return (
    <div className="container mx-auto w-full h-auto items-center justify-center">
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 items-center justify-center w-full">
        {p.celebGalleryItems.map((celebData) => {
          const picture = celebData.picture || context.placeholderImage;

          return (
            <a
              className="transition-all duration-[400ms] overflow-hidden rounded-xl w-full"
              href={`/${celebData.slug}`}
              key={celebData.slug}
            >
              <span className="relative block w-full h-auto" width={200} height={230}>
                <Image
                  objectFit="cover"
                  objectPosition="center"
                  blurDataURL={picture.metadata.lqip}
                  placeholder="blur"
                  src={sanityImage(picture).url()}
                  alt={celebData.name}
                  layout="responsive"
                  width={200}
                  height={230}
                  className="rounded-lg w-full h-auto block"
                />

                <Typography
                  variant="h4"
                  component="p"
                  className="font-primary absolute bottom-4 left-4 font-semibold text-white z-10 text-sm"
                >
                  {celebData.name}
                </Typography>
              
                <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent via-transparent to-black block" />
              </span>
              
            </a>
          );
        })}
      </div>
    </div>
  );
};
