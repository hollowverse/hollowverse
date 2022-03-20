import React from 'react';
import { featureFlags } from '~/pages/components/featureFlags';
import { AddFactButton } from '~/pages/[celeb]/AddFactButton';
import {
  TCelebOldContent,
  TCeleb,
  TPic,
  TSlug,
  CelebProps,
} from '~/pages/components/types';
import { Discussion } from '~/pages/[celeb]/Discussion/Discussion';
import { Md } from '~/pages/[celeb]/Md/Md';
import { PageHead } from '~/pages/[celeb]/PageHead/PageHead';
import { TopSection } from '~/pages/[celeb]/TopSection/TopSection';
import { Facts } from './Facts';

const Celeb = (p: CelebProps) => {
  return (
    <main>
      <PageHead />

      <TopSection />

      {featureFlags.AddFactButton && <AddFactButton />}

      {/* <Facts /> */}

      {p.celebOldContent && <Md />}

      <Discussion />
    </main>
  );
};

export default Celeb;

export { getStaticPaths } from './getStaticPaths';
export { getStaticProps } from './getStaticProps';
