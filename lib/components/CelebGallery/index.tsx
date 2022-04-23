import React from 'react';
import Image from 'next/image';
import { sanityImage } from '~/lib/components/sanityio';
import { TCelebGalleryItem } from '~/lib/components/types';
import { useCelebContext } from '~/lib/components/StaticPropsContextProvider';


export const CelebGallery: React.FC<{
  celebGalleryItems: TCelebGalleryItem[];
}> = (p) => {
  const context = useCelebContext();

  return (
    <div className="flex w-full h-screen bg-black">
      {p.celebGalleryItems.map((celebData) => {
        const picture = celebData.picture || context.placeholderImage;

        return (
          <a
            className=""
            href={`/${celebData.slug}`}
            key={celebData.slug}
          >
            <span className="">
              <Image
                src={sanityImage(picture).width(200).height(250).url()}
                alt={celebData.name}
                width={160}
                height={200}
                className=""
              />
            </span>
            <div
              className=""
            >
              {celebData.name}
            </div>
          </a>
        );
      })}
    </div>
  );
};
