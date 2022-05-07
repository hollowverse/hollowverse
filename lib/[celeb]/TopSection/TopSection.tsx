import { isEmpty } from 'lodash-es';
import Image from 'next/image';
import React from 'react';
import { Card } from '~/lib/components/Card';
import { sanityImage } from '~/lib/components/sanityio';
import { useCelebContext } from '~/lib/components/StaticPropsContextProvider';
import { TagCollection } from '~/lib/[celeb]/TagCollection';

export const TopSection = () => {
  const context = useCelebContext();
  const picture = context.celeb.picture || context.placeholderImage;

  return (
    <Card className="TOP-SECTION lg:mt-5 lg:border-t">
      <div className="flex items-center gap-5 bg-white lg:border-0">
        <Image
          className="rounded-full object-cover"
          src={sanityImage(picture).url()}
          width="100%"
          height="100%"
          priority
          alt="Popular Celebrity"
        />
        <h1>
          <span className="text-sm font-normal tracking-wide text-neutral-500">
            Religion, politics, and ideas of
          </span>
          <br />
          <span className="text-3xl font-extrabold tracking-tight">
            {context.celeb.name}
          </span>
        </h1>
      </div>

      {!isEmpty(context.celeb.tags.regular) && (
        <div className="bg-white pt-5">
          <TagCollection />
        </div>
      )}
    </Card>
  );
};
