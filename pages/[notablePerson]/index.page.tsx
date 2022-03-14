import React from 'react';
import { featureFlags } from '~/pages/featureFlags';
import { AddFactButton } from '~/pages/[notablePerson]/AddFactButton';
import {
  TNotablePersonMd,
  TNotablePersonYaml,
  TPic,
  TSlug,
} from '~/pages/common/types';
import { Discussion } from '~/pages/[notablePerson]/Discussion/Discussion';
import { Md } from '~/pages/[notablePerson]/Md/Md';
import { PageHead } from '~/pages/[notablePerson]/PageHead/PageHead';
import { TopSection } from '~/pages/[notablePerson]/TopSection/TopSection';

export type NotablePersonProps = {
  notablePersonYaml: TNotablePersonYaml;
  pic: TPic;
  notablePersonMd?: TNotablePersonMd;
  slug: TSlug;
};

const NotablePerson = (p: NotablePersonProps) => {
  return (
    <main>
      <PageHead />

      <TopSection />

      {featureFlags.addFactButton && <AddFactButton />}

      {p.notablePersonMd && <Md />}

      <Discussion />
    </main>
  );
};

export default NotablePerson;

export { getStaticPaths } from './getStaticPaths';
export { getStaticProps } from './getStaticProps';
