import React from 'react';
import { Card } from '~/lib/pages/components/Card';
import { CelebGallery } from '~/lib/pages/components/CelebGallery';
import { useCelebContext } from '~/lib/pages/components/StaticPropsContextProvider';

export const InterestingProfiles = () => {
  const context = useCelebContext();
  const relatedPeople = context.celeb.oldContent!.relatedPeople;

  return (
    <Card title="Other interesting profiles" disablePadding>
      <CelebGallery celebGalleryItems={relatedPeople} />
    </Card>
  );
};
