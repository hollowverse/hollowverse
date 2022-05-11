import React from 'react';
import Image, { ImageProps } from 'next/image';
import { sanityImage } from '~/lib/pages/utils/sanityio';
import { TPicture } from '~/lib/pages/utils/types';
import { Optional } from 'utility-types';

export function CelebImage(
  params: Optional<ImageProps, 'src'> & {
    picture: TPicture;
    slug: string;
    name: string;
  },
) {
  const { picture, slug, name, ...rest } = params;

  return (
    <Image
      src={sanityImage(picture)
        .fit('crop')
        .crop('top')
        .width(260)
        .height(290)
        .url()}
      layout="responsive"
      width={260}
      height={290}
      objectFit="cover"
      objectPosition="top"
      blurDataURL={picture.metadata.lqip}
      placeholder="blur"
      alt={name}
      {...rest}
    />
  );
}
