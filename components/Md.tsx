import React, { useState } from 'react';
import { CelebPageProps } from '~/pages/[celeb]/getStaticProps';
import { Article } from './Article';
import { InterestingProfiles } from './InterestingProfiles';
import { Sources } from './Sources';

export const Md = (props: CelebPageProps) => {
  const [showSources, setShowSources] = useState(false);
  const oldContent = props.celeb.oldContent!;

  return (
    <section>
      {oldContent.article && (
        <Article setShowSources={setShowSources} {...props} />
      )}

      {oldContent.sources?.length > 0 && (
        <Sources
          showSources={showSources}
          setShowSources={setShowSources}
          {...props}
        />
      )}

      <InterestingProfiles {...props} />
    </section>
  );
};
