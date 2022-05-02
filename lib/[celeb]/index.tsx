import React from 'react';
import { featureFlags } from '~/lib/components/featureFlags';
import { CelebPageProps } from '~/lib/components/types';
import { AddFactButton } from '~/lib/[celeb]/AddFactButton';
import { Facts } from '~/lib/[celeb]/Facts';
import { Md } from '~/lib/[celeb]/Md/Md';
import { PageHead } from '~/lib/[celeb]/PageHead/PageHead';
import { TagCollection } from '~/lib/[celeb]/TagCollection';
import { TopSection } from '~/lib/[celeb]/TopSection/TopSection';
import { AppBar } from '~/lib/_app/AppBar/AppBar';

export const Celeb = (p: CelebPageProps) => {
  return (
    <>
      <AppBar />
      <main>
        <PageHead />

        <TopSection />

        {p.celeb.tags && <TagCollection />}

        {p.celeb.facts && <Facts />}

        {featureFlags.AddFactButton && <AddFactButton />}

        {p.celeb.oldContent && <Md />}
      </main>
    </>
  );
};

export default Celeb;
