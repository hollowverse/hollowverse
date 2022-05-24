import React from 'react';
import { Card } from '~/components/Card';
import { CelebGallery } from '~/components/CelebGallery';
import { useCelebContext } from '~/components/StaticPropsContextProvider';

export const InterestingProfiles = () => {
  const context = useCelebContext();
  const relatedPeople = context.celeb.oldContent!.relatedPeople;

  return (
    <Card title="Other interesting profiles" disablePadding>
      <CelebGallery celebGalleryItems={relatedPeople} />
    </Card>
  );
};
