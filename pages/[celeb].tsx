import { isEmpty } from 'lodash-es';
import React from 'react';
import { Facts } from '~/components/Facts';
import { ContributeCta } from '~/components/ContributeCta';
import { Md } from '~/components/Md';
import { TopSection } from '~/components/TopSection';
import { getHeadDescription, useCeleb } from '~/lib/celebPageHelpers';
import { Page } from '~/components/Page';
import { CelebPageProps } from '~/lib/types';

export default function Celeb(p: CelebPageProps) {
  useCeleb(p.celeb.name, p.celeb.facts.groups);

  return (
    <Page
      title={`${p.celeb.name}'s religion and political views`}
      description={getHeadDescription(
        p.celeb.name,
        p.celeb.tags,
        p.celeb.oldContent,
      )}
      allowSearchEngines
      pathname={p.celeb.slug}
    >
      <TopSection />

      <div className="mx-auto max-w-3xl">
        {!isEmpty(p.celeb.facts.groups) && (
          <div className="mb-5">
            <Facts />
          </div>
        )}

        {p.celeb.oldContent && <Md />}

        <ContributeCta name={p.celeb.name} />
      </div>
    </Page>
  );
}

export { getStaticPaths } from '~/pages/[celeb]/getStaticPaths';
export { getStaticProps } from '~/pages/[celeb]/getStaticProps';
