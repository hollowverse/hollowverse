import React from 'react';
import { Card } from '~/components/Card';
import { CelebGallery } from '~/components/CelebGallery';
import { CelebPageProps } from '~/pages/[celeb]/getStaticProps';

export const InterestingProfiles = (props: CelebPageProps) => {
  const relatedPeople = props.celeb.oldContent!.relatedPeople;

  return (
    <Card title="Other interesting profiles" disablePadding>
      <CelebGallery celebGalleryItems={relatedPeople} />
    </Card>
  );
};
