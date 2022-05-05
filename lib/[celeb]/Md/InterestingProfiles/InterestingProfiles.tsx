import React from 'react';
import { CelebGallery } from '~/lib/components/CelebGallery';
import { useCelebContext } from '~/lib/components/StaticPropsContextProvider';

export const InterestingProfiles = () => {
  const context = useCelebContext();
  const relatedPeople = context.celeb.oldContent!.relatedPeople;

  return (
    <div className="mb-5">
      <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400" />
      <div className="border-y bg-white p-5 font-bold lg:border-0 lg:border-x">
        Other interesting profiles
      </div>

      <div className="border-b lg:border-x">
        <CelebGallery celebGalleryItems={relatedPeople} />
      </div>
    </div>
  );
};
