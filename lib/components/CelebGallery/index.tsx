import Image from 'next/image';
import React from 'react';
import { sanityImage } from '~/lib/components/sanityio';
import { useCelebContext } from '~/lib/components/StaticPropsContextProvider';
import { TCelebGalleryItem } from '~/lib/components/types';

export const CelebGallery: React.FC<{
  celebGalleryItems: TCelebGalleryItem[];
}> = (p) => {
  const context = useCelebContext();

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-2 border-b sm:grid-cols-3 md:grid-cols-4 lg:border-x">
      {p.celebGalleryItems.map((celebData) => {
        const picture = celebData.picture || context.placeholderImage;

        return (
          <div
            key={celebData.slug}
            className="relative aspect-square overflow-hidden shadow-sm"
          >
            <a
              className="flex aspect-square flex-col items-center overflow-hidden"
              href={`/${celebData.slug}`}
              key={celebData.slug}
            >
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

            <h2
              aria-label="Celebrity"
              className="relative bottom-12 left-3 z-[9999] inline-flex bg-black bg-opacity-75 p-1.5 px-3 text-sm font-medium text-white lg:text-base"
            >
              {celebData.name}
            </h2>
          </div>
        );
      })}
    </div>
  );
};
