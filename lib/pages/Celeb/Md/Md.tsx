import React, { useState } from 'react';
import { useCelebContext } from '~/lib/pages/components/StaticPropsContextProvider';
import { Article } from './Article';
import { InterestingProfiles } from './InterestingProfiles';
import { Sources } from './Sources';

export const Md = () => {
  const [showSources, setShowSources] = useState(false);
  const context = useCelebContext();
  const oldContent = context.celeb.oldContent!;

  return (
    <section>
      {oldContent.article && <Article setShowSources={setShowSources} />}

      {oldContent.sources?.length > 0 && (
        <Sources showSources={showSources} setShowSources={setShowSources} />
      )}

      <InterestingProfiles />
    </section>
  );
};
