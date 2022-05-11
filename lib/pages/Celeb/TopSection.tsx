import { isEmpty } from 'lodash-es';
import Image from 'next/image';
import React from 'react';
import { Card } from '~/lib/pages/components/Card';
import { sanityImage } from '~/lib/pages/utils/sanityio';
import { useCelebContext } from '~/lib/pages/components/StaticPropsContextProvider';
import { TagCollection } from '~/lib/pages/Celeb/TagCollection';
import { CelebImage } from '~/lib/pages/components/CelebImage';

export const TopSection = () => {
  const context = useCelebContext();
  const picture = context.celeb.picture || context.placeholderImage;

  return (
    <Card className="TOP-SECTION bg-white">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-5">
          <div className="aspect-square h-[200px] w-[200px] rounded-md ">
            <CelebImage
              className="rounded-md object-cover"
              key={context.celeb.name + '-topSection-image'}
              picture={picture}
              slug={context.celeb.slug}
              name={context.celeb.name}
            />
          </div>
          <h1 className="text-center">
            <span className="text-sm font-normal tracking-wide text-neutral-500">
              Religion, politics, and ideas of
            </span>
            <br />
            <span className="text-4xl font-extrabold tracking-tight">
              {context.celeb.name}
            </span>
          </h1>
        </div>

        {!isEmpty(context.celeb.tags.regular) && (
          <div className="flex justify-center pt-5">
            <TagCollection />
          </div>
        )}
      </div>
    </Card>
  );
};
