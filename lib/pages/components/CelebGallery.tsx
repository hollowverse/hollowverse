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
    <div className="mx-auto grid max-w-4xl grid-cols-2 border-b lg:border-x xs:grid-cols-3 sm:grid-cols-4">
      {p.celebGalleryItems.map((celebData) => {
        const picture = celebData.picture || context.placeholderImage;

        return (
          <div
            key={celebData.slug}
            className="relative aspect-square overflow-hidden"
          >
            <div>
              <Link href={`/${celebData.slug}`} passHref>
                <a className="relative aspect-square overflow-hidden">
                  <Image
                    key={celebData.slug + '-image'}
                    src={sanityImage(picture).width(260).height(290).url()}
                    layout="responsive"
                    width={260}
                    height={290}
                    objectFit="cover"
                    objectPosition="top"
                    blurDataURL={picture.metadata.lqip}
                    placeholder="blur"
                    alt={celebData.name}
                  />
                </a>
              </Link>
            </div>

            <Link href={`/${celebData.slug}`} passHref>
              <a
                aria-label="Celebrity"
                className="relative bottom-20 left-3 z-[9999] inline-flex cursor-pointer select-none bg-black bg-opacity-75 p-1.5 px-3 text-sm font-medium text-white lg:text-base"
              >
                {celebData.name}
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
