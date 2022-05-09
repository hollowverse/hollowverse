import Image from 'next/image';
import React from 'react';
import { sanityImage } from '~/lib/pages/utils/sanityio';
import { useCelebContext } from '~/lib/pages/components/StaticPropsContextProvider';
import { TCelebGalleryItem } from '~/lib/pages/utils/types';
import Link from 'next/link';

export const CelebGallery: React.FC<{
  celebGalleryItems: TCelebGalleryItem[];
}> = (p) => {
  const context = useCelebContext();

  return (
    <div className="lg:border-x mx-auto grid max-w-4xl grid-cols-2 border-b xs:grid-cols-3 sm:grid-cols-4">
      {p.celebGalleryItems.map((celebData) => {
        const picture = celebData.picture || context.placeholderImage;

        return (
          <div
            key={celebData.slug}
            className="relative aspect-square overflow-hidden"
          >
            <Link href={`/${celebData.slug}`} passHref key={celebData.slug}>
              <a className="flex aspect-square flex-col items-center overflow-hidden">
                <Image
                  src={sanityImage(picture).width(260).height(290).url()}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                  blurDataURL={picture.metadata.lqip}
                  placeholder="blur"
                  alt={celebData.name}
                  width={160}
                  height={200}
                />
              </a>
            </Link>
            <Link href={`/${celebData.slug}`} passHref key={celebData.slug}>
              <h2
                aria-label="Celebrity"
                className="lg:text-base relative bottom-12 left-3 z-[9999] inline-flex cursor-pointer select-none bg-black bg-opacity-75 p-1.5 px-3 text-sm font-medium text-white"
              >
                {celebData.name}
              </h2>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
