import React from 'react';
import Image, { ImageProps } from 'next/image';
import { sanityImage } from '~/lib/sanityio';
import { Optional } from 'utility-types';
import { placeholderImage } from '~/lib/placeholderImage';
import { Picture } from '~/lib/groq/picture.partial.groq';

type Params = (
  | (Omit<ImageProps, 'src'> & {
      picture: Picture;
      src?: undefined;
    })
  | (Optional<ImageProps, 'src'> & { picture?: undefined })
) & {
  name: string;
  width?: number;
  height?: number;
};

export function CelebImage(params: Params) {
  const { src, picture: _picture, name, ...rest } = params;
  const picture = _picture || placeholderImage;

  return (
    <Image
      src={
        src ||
        sanityImage(picture)
          .fit('crop')
          .crop('top')
          .width(rest.width || 260)
          .height(rest.height || 290)
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
