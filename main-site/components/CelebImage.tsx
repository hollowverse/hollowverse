import React from 'react';
import Image, { ImageProps } from 'next/image';
import { sanityImage } from '~/shared/lib/sanityio';
import { Optional } from 'utility-types';
import { placeholderImage } from '~/lib/placeholderImage';
import { Picture } from '~/lib/groq/picture.projection';

export type CelebImageProps = (
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

export function CelebImage(props: CelebImageProps) {
  const { src, picture: _picture, name, ...rest } = props;
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
