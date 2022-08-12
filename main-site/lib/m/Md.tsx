import { useState } from 'react';
import { CelebPageProps } from '~/lib/c/celebPage.getStaticProps';
import { Article } from '../a/Article';
import { InterestingProfiles } from '../i/InterestingProfiles';
import { Sources } from '../s/Sources';

export const Md = (props: CelebPageProps) => {
  const [showSources, setShowSources] = useState(false);
  const oldContent = props.celeb.oldContent!;

  return (
    <section className="flex flex-col gap-5">
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
