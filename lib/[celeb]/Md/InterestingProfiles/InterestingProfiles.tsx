import { Container } from '@mui/material';
import React from 'react';
import { CelebGallery } from '~/lib/components/CelebGallery';
import { Separator } from '~/lib/components/Separator';
import { useCelebContext } from '~/lib/components/StaticPropsContextProvider';
import s from './styles.module.scss';

export const InterestingProfiles = () => {
  const context = useCelebContext();
  const relatedPeople = context.celeb.oldContent!.relatedPeople;

  return (
    <div className="px-4 lg:px-0 max-w-home-container mx-auto">
      <Separator title="Other interesting profiles" />

      <div className="mt-4">
        <CelebGallery celebGalleryItems={relatedPeople} />
      </div>
    </div>
  );
};
