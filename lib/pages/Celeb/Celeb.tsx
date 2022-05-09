import { isEmpty } from 'lodash-es';
import React from 'react';
import { AddFactButton } from '~/lib/pages/Celeb/AddFactButton';
import { Facts } from '~/lib/pages/Celeb/Facts/Facts';
import { Md } from '~/lib/pages/Celeb/Md/Md';
import { PageHead } from '~/lib/pages/Celeb/PageHead';
import { TopSection } from '~/lib/pages/Celeb/TopSection';
import { useCeleb } from '~/lib/pages/Celeb/useCeleb';
import { featureFlags } from '~/lib/pages/utils/featureFlags';
import { CelebPageProps } from '~/lib/pages/utils/types';

export const Celeb = (p: CelebPageProps) => {
  useCeleb(p.celeb.name, p.celeb.facts);

  return (
    <main className="flex flex-col bg-gray-100">
      <PageHead />
      <TopSection />
      <div className="mx-auto max-w-4xl">
        {!isEmpty(p.celeb.facts) && (
          <div className="mb-5">
            <Facts />
          </div>
        )}

        {p.celeb.oldContent && <Md />}
      </div>
    </main>
  );
};