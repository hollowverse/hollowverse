import { isEmpty } from 'lodash-es';
import React from 'react';
import { Card } from '~/components/Card';
import { CelebImage } from '~/components/CelebImage';
import { TagCollection } from '~/components/TagCollection';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';

export const TopSection = (props: CelebPageProps) => {
  const picture = props.celeb.picture;

  return (
    <Card className="TOP-SECTION">
      <div className="h-container">
        <div className="flex flex-col items-center gap-5">
          <div className="aspect-square h-[200px] w-[200px] rounded-md">
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
            <span className="mt-2 block text-4xl font-extrabold tracking-tight">
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
    </Card>
  );
};
