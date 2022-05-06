import Image from 'next/image';
import React from 'react';
import { sanityImage } from '~/lib/components/sanityio';
import { useCelebContext } from '~/lib/components/StaticPropsContextProvider';

// logan's comment, celeb page top content

export const TopSection = () => {
  const context = useCelebContext();
  const picture = context.celeb.picture || context.placeholderImage;

  return (
    <div className="flex w-full flex-col gap-2.5 lg:mt-5 lg:border-x lg:border-t">
      <div className="flex items-center gap-5 bg-white p-5 lg:border-0">
        <div className="">
          <Image
            className="rounded-full object-cover"
            src={sanityImage(picture).url()}
            width="100%"
            height="100%"
            priority
            alt="Popular Celebrity"
          />
        </div>
        <h1 className="">
          <span className="text-sm font-normal tracking-wide text-neutral-500">
            Religion, politics, and ideas of
          </span>
          <br />
          <span className="text-3xl font-extrabold tracking-tight">
            {context.celeb.name}
          </span>
        </h1>
      </div>
    </div>
  );
};
