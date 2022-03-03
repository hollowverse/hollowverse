import React from 'react';
import { featureFlags } from '~/components/featureFlags';
import { AddFactButton } from '~/components/AddFactButton';
import {
  TNotablePersonMd,
  TNotablePersonYaml,
  TPic,
  TSlug,
} from '~/pages/common/types';
import { Discussion } from './[notablePerson]/Discussion/Discussion';
import { Md } from './[notablePerson]/Md/Md';
import { PageHead } from './[notablePerson]/PageHead/PageHead';
import { TopSection } from './[notablePerson]/TopSection/TopSection';

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

export { getStaticPaths } from './[notablePerson]/getStaticPaths';
export { getStaticProps } from './[notablePerson]/getStaticProps';
