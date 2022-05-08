import { isEmpty } from 'lodash-es';
import React from 'react';
import { featureFlags } from '~/lib/pages/utils/featureFlags';
import { CelebPageProps } from '~/lib/pages/utils/types';
import { AddFactButton } from '~/lib/pages/Celeb/AddFactButton';
import { Facts } from '~/lib/pages/Celeb/Facts/Facts';
import { Md } from '~/lib/pages/Celeb/Md/Md';
import { PageHead } from '~/lib/pages/Celeb/PageHead';
import { TagCollection } from '~/lib/pages/Celeb/TagCollection';
import { TopSection } from '~/lib/pages/Celeb/TopSection';
import { useCeleb } from '~/lib/pages/Celeb/useCeleb';
import { AppBar } from '~/lib/pages/_app/AppBar';

export const Celeb = (p: CelebPageProps) => {
  useCeleb(p.celeb.name, p.celeb.facts);

  return (
    <>
      <AppBar />

      <main className="flex flex-col bg-gray-100">
        <div className="mx-auto max-w-4xl">
          <PageHead />

          <TopSection />

          {featureFlags.AddFactButton && (
            <div className="m-5 flex items-center justify-end self-center lg:m-0 lg:my-5">
              <AddFactButton />
            </div>
          )}

          {!isEmpty(p.celeb.facts) && (
            <div className="mb-5">
              <Facts />
            </div>
          )}

          {p.celeb.oldContent && <Md />}
        </div>
      </main>
    </>
  );
};
