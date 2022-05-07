import React from 'react';
import { Card } from '~/lib/components/Card';
import { CelebGallery } from '~/lib/components/CelebGallery';
import { useCelebContext } from '~/lib/components/StaticPropsContextProvider';

export const InterestingProfiles = () => {
  const context = useCelebContext();
  const relatedPeople = context.celeb.oldContent!.relatedPeople;

  return (
    <Card title="Other interesting profiles" disablePadding>
      <CelebGallery celebGalleryItems={relatedPeople} />
    </Card>
  );
};
