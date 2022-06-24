import React from 'react';
import { CelebGallery } from '~/components/CelebGallery';
import { TitledCard } from '~/components/ui/TitledCard';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';

export const InterestingProfiles = (props: CelebPageProps) => {
  const relatedPeople = props.celeb.oldContent!.relatedPeople;

  return (
    <TitledCard titledContentProps={{ title: 'Other interesting profiles' }}>
      <div className="px-5 py-2">
        <CelebGallery celebGalleryItems={relatedPeople} />
      </div>
    </TitledCard>
  );
};
