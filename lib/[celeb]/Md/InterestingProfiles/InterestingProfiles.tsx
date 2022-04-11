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
    <div className={s.InterestingProfiles}>
      <Separator title="Other interesting profiles" />

      <Container maxWidth="md">
        <CelebGallery celebGalleryItems={relatedPeople} />
      </Container>
    </div>
  );
};
