import React from 'react';
import { featureFlags } from '~/src/components/featureFlags';
import { AddFactButton } from '~/src/[celeb]/AddFactButton';
import {
  TCelebOldContent,
  TCeleb,
  TSlug,
  CelebPageProps,
} from '~/src/components/types';
import { Discussion } from '~/src/[celeb]/Discussion/Discussion';
import { Md } from '~/src/[celeb]/Md/Md';
import { PageHead } from '~/src/[celeb]/PageHead/PageHead';
import { TopSection } from '~/src/[celeb]/TopSection/TopSection';
import { Facts } from './Facts';

export const Celeb = (p: CelebPageProps) => {
  return (
    <main>
      <PageHead />

      <TopSection />

      {featureFlags.AddFactButton && <AddFactButton />}

      {/* <Facts /> */}

      {p.celeb.oldContent && <Md />}

      <Discussion />
    </main>
  );
};

export default Celeb;

export { getStaticPaths } from './getStaticPaths';
export { getStaticProps } from './getStaticProps';