import React from 'react';
import { featureFlags } from '~/pages/components/featureFlags';
import { AddFactButton } from '~/pages/[celeb]/AddFactButton';
import { TCelebMd, TCelebYaml, TPic, TSlug } from '~/pages/components/types';
import { Discussion } from '~/pages/[celeb]/Discussion/Discussion';
import { Md } from '~/pages/[celeb]/Md/Md';
import { PageHead } from '~/pages/[celeb]/PageHead/PageHead';
import { TopSection } from '~/pages/[celeb]/TopSection/TopSection';
import { Facts } from './Facts';

export type CelebProps = {
  celebYaml: TCelebYaml;
  pic: TPic;
  celebMd?: TCelebMd;
  slug: TSlug;
};

const Celeb = (p: CelebProps) => {
  return (
    <main>
      <PageHead />

      <TopSection />

      {featureFlags.AddFactButton && <AddFactButton />}

      <Facts />

      {p.celebMd && <Md />}

      <Discussion />
    </main>
  );
};

export default Celeb;

export { getStaticPaths } from './getStaticPaths';
export { getStaticProps } from './getStaticProps';
