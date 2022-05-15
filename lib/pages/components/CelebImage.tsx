import React from 'react';
import Image, { ImageProps } from 'next/image';
import { sanityImage } from '~/lib/pages/utils/sanityio';
import { TPicture } from '~/lib/pages/utils/types';
import { Optional } from 'utility-types';

type Params = (
  | (Omit<ImageProps, 'src'> & {
      picture: TPicture;
      src?: undefined;
    })
  | (ImageProps & { picture?: undefined })
) & {
  name: string;
};

export function CelebImage(params: Params) {
  const { src, picture, name, ...rest } = params;

  return (
    <Image
      src={
        src ||
        sanityImage(picture!)
          .fit('crop')
          .crop('top')
          .width(260)
          .height(290)
          .url()
      }
      layout="responsive"
      width={260}
      height={290}
      objectFit="cover"
      objectPosition="top"
      blurDataURL={picture ? picture.metadata.lqip : ''}
      placeholder={picture ? 'blur' : undefined}
      alt={name}
      {...rest}
    />
  );
}
