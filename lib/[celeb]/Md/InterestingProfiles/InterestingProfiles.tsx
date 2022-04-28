import React from 'react';
import { CelebGallery } from '~/lib/components/CelebGallery';
import { Separator } from '~/lib/components/Separator';
import { useCelebContext } from '~/lib/components/StaticPropsContextProvider';

export const InterestingProfiles = () => {
  const context = useCelebContext();
  const relatedPeople = context.celeb.oldContent!.relatedPeople;

  return (
    <div className="px-4 max-w-home-container mx-auto">
      <Separator title="Other interesting profiles" />

      <div className="mt-5">
        <CelebGallery celebGalleryItems={relatedPeople} />
      </div>
    </div>
  );
};
