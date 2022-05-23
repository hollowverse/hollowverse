import Link from 'next/link';
import React from 'react';
import { CelebImage } from '~/lib/pages/components/CelebImage';
import { useCelebContext } from '~/lib/pages/components/StaticPropsContextProvider';
import { TCelebGalleryItem } from '~/lib/pages/utils/types';

export const CelebGallery: React.FC<{
  celebGalleryItems: TCelebGalleryItem[];
}> = (p) => {
  const context = useCelebContext();

  return (
    <div className="flex flex-wrap justify-center">
      {p.celebGalleryItems.map((celebData) => {
        const picture = celebData.picture;

        return (
          <Link href={`/${celebData.slug}`} passHref key={celebData.slug}>
            <a className="m-2 w-full min-w-[150px] max-w-[200px] flex-shrink flex-grow basis-[100px] overflow-hidden rounded-xl">
              <div className="relative w-full">
                <CelebImage
                  key={celebData.slug + '-image'}
                  picture={picture}
                  name={celebData.name}
                />

                <p className="font-primary absolute bottom-3 left-3 z-10 text-sm font-semibold text-white">
                  {celebData.name}
                </p>

                {/* overlay */}
                <div className="pointer-events-none absolute top-0 left-0 block h-full w-full bg-gradient-to-b from-transparent via-transparent to-black" />
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};
