/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { isEmpty } from 'lodash-es';
import React from 'react';
import { InFeedAd } from '~/components/InFeedAd';
import { TitledCard } from '~/components/ui/TitledCard';
import { c } from '~/lib/c';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';
import s from '~/styles/styles.module.scss';

export const Article = (
  props: CelebPageProps & {
    setShowSources: React.Dispatch<React.SetStateAction<boolean>>;
  },
) => {
  const oldContent = props.celeb.oldContent!;

  return (
    <article
      className="flex flex-col gap-5"
      onClick={(e) => {
        if ((e.target as Element).classList.contains('source-citation')) {
          props.setShowSources(true);
        }
      }}
    >
      {oldContent.summaries && (
        <TitledCard titledContentProps={{ title: 'Summary' }}>
          <div className="p-5" id="editorial-summary">
            <p>{oldContent.summaries.religion}</p>
            <p className="mt-3">{oldContent.summaries.politicalViews}</p>
          </div>
        </TitledCard>
      )}

      {isEmpty(props.facts) && (
        <InFeedAd key={`article-ad-${props.celeb.slug}`} />
      )}

      <TitledCard titledContentProps={{ title: 'Editorial' }}>
        <div
          id="editorial"
          className={c(s.Article, 'break-normal p-5 leading-relaxed')}
          dangerouslySetInnerHTML={{ __html: oldContent.article }}
        />
      </TitledCard>
    </article>
  );
};
