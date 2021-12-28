import React from 'react';
import {
  TNotablePersonMd,
  TNotablePersonYaml,
  TPic,
  TSlug,
} from 'pages/common/types';
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
      <PageHead {...p} />

      <TopSection {...p} />

      {p.notablePersonMd && <Md {...p} />}
    </main>
  );
};

export default NotablePerson;

export { getStaticPaths } from './[notablePerson]/getStaticPaths';
export { getStaticProps } from './[notablePerson]/getStaticProps';
