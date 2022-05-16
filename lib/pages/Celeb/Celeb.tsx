import { isEmpty } from 'lodash-es';
import React from 'react';
import { Facts } from '~/lib/pages/Celeb/Facts/Facts';
import { ForumInvite } from '~/lib/pages/components/ForumInvite';
import { Md } from '~/lib/pages/Celeb/Md/Md';
import { TopSection } from '~/lib/pages/Celeb/TopSection';
import {
  getHeadDescription,
  useCeleb,
} from '~/lib/pages/Celeb/celebPageHelpers';
import { Page } from '~/lib/pages/components/Page';
import { CelebPageProps } from '~/lib/pages/utils/types';

export const Celeb = (p: CelebPageProps) => {
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

      <div className="mx-auto max-w-4xl">
        {!isEmpty(p.celeb.facts.groups) && (
          <div className="mb-5">
            <Facts />
          </div>
        )}

        {p.celeb.oldContent && <Md />}

        <ForumInvite name={p.celeb.name} />
      </div>
    </Page>
  );
};
