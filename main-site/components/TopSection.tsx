import { isEmpty } from 'lodash-es';
import React from 'react';
import { Card } from '~/components/Card';
import { CelebImage } from '~/components/CelebImage';
import { TagCollection } from '~/components/TagCollection';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';

export const TopSection = (props: CelebPageProps) => {
  const picture = props.celeb.picture;

  return (
    <div className="TOP-SECTION h-container p-5">
      <div className="flex flex-wrap items-end gap-x-5">
        <div className="w-[150px] rounded-md">
          <CelebImage
            className="rounded-md object-cover"
            key={props.celeb.name + '-topSection-image'}
            picture={picture}
            name={props.celeb.name}
          />
        </div>
        <h1 className="mt-5">
          <span className="text-lg font-normal tracking-wide text-neutral-500">
            The Views of
          </span>{' '}
          <span className="mt-1 block text-4xl font-extrabold tracking-tight">
            {props.celeb.name}
          </span>
        </h1>
      </div>

      {!isEmpty(props.celeb.tags) && (
        <div className="pt-5">
          <TagCollection {...props} />
        </div>
      )}
    </div>
  );
};