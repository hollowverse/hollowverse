import { isEmpty } from 'lodash-es';
import React from 'react';
import { Facts } from '~/lib/pages/Celeb/Facts/Facts';
import { ForumInvite } from '~/lib/pages/components/ForumInvite';
import { Md } from '~/lib/pages/Celeb/Md/Md';
import { PageHead } from '~/lib/pages/Celeb/PageHead';
import { TopSection } from '~/lib/pages/Celeb/TopSection';
import { useCeleb } from '~/lib/pages/Celeb/useCeleb';
import { Page } from '~/lib/pages/components/Page';
import { CelebPageProps } from '~/lib/pages/utils/types';

export const Celeb = (p: CelebPageProps) => {
  useCeleb(p.celeb.name, p.celeb.facts.groups);

  return (
    <>
      <PageHead />

      <Page>
        <TopSection />

        <div className="mx-auto max-w-3xl">
          {!isEmpty(p.celeb.facts.groups) && (
            <div className="mb-5">
              <Facts />
            </div>
          )}

          {p.celeb.oldContent && <Md />}

          <ForumInvite name={p.celeb.name} />
        </div>
      </Page>
    </>
  );
};
