import Image from 'next/image';
import React from 'react';
import { sanityImage } from '~/lib/pages/utils/sanityio';
import { useCelebContext } from '~/lib/pages/components/StaticPropsContextProvider';
import { TCelebGalleryItem } from '~/lib/pages/utils/types';
import Link from 'next/link';
import { CelebImage } from '~/lib/pages/components/CelebImage';

export const CelebGallery: React.FC<{
  celebGalleryItems: TCelebGalleryItem[];
}> = (p) => {
  const context = useCelebContext();

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-2 border-b sm:grid-cols-4 lg:border-x">
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
                  <CelebImage
                    key={celebData.slug + '-image'}
                    picture={picture}
                    slug={celebData.slug}
                    name={celebData.name}
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
