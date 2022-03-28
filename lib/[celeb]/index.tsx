import React from 'react';
import { featureFlags } from '~/lib/components/featureFlags';
import { CelebPageProps } from '~/lib/components/types';
import { AddFactButton } from '~/lib/[celeb]/AddFactButton';
import { Discussion } from '~/lib/[celeb]/Discussion/Discussion';
import { Md } from '~/lib/[celeb]/Md/Md';
import { PageHead } from '~/lib/[celeb]/PageHead/PageHead';
import { TopSection } from '~/lib/[celeb]/TopSection/TopSection';

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
