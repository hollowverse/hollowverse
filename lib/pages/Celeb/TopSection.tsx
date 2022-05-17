import { isEmpty } from 'lodash-es';
import React from 'react';
import { TagCollection } from '~/lib/pages/Celeb/TagCollection';
import { Card } from '~/lib/pages/components/Card';
import { CelebImage } from '~/lib/pages/components/CelebImage';
import { useCelebContext } from '~/lib/pages/components/StaticPropsContextProvider';

export const TopSection = () => {
  const context = useCelebContext();
  const picture = context.celeb.picture || context.placeholderImage;

  return (
    <Card className="TOP-SECTION">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center gap-5">
          <div className="aspect-square h-[200px] w-[200px] rounded-md">
            <CelebImage
              className="rounded-md object-cover"
              key={context.celeb.name + '-topSection-image'}
              picture={picture}
              name={context.celeb.name}
            />
          </div>
          <h1 className="mt-5 text-center">
            <span className="text-base font-normal tracking-wide text-neutral-500">
              Religion, politics, and ideas of
            </span>
            <span className="mt-2 block text-4xl font-extrabold tracking-tight">
              {context.celeb.name}
            </span>
          </h1>
        </div>

        {!isEmpty(context.celeb.tags) && (
          <div className="flex justify-center pt-5">
            <TagCollection />
          </div>
        )}
      </div>
    </Card>
  );
};
