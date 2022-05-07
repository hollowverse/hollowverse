import { isEmpty } from 'lodash-es';
import React from 'react';
import { featureFlags } from '~/lib/components/featureFlags';
import { CelebPageProps } from '~/lib/components/types';
import { AddFactButton } from '~/lib/[celeb]/AddFactButton';
import { Facts } from '~/lib/[celeb]/Facts';
import { Md } from '~/lib/[celeb]/Md/Md';
import { PageHead } from '~/lib/[celeb]/PageHead/PageHead';
import { TagCollection } from '~/lib/[celeb]/TagCollection';
import { TopSection } from '~/lib/[celeb]/TopSection/TopSection';
import { useCeleb } from '~/lib/[celeb]/useCeleb';
import { AppBar } from '~/lib/_app/AppBar/AppBar';

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
