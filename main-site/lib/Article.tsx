/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { c } from '~/lib/c';
import { CelebPageMainProps } from '~/lib/celebPageMain.getStaticProps';
import { TitledCard } from '~/lib/TitledCard.ui';
import s from '~/styles/styles.module.scss';

export const Article = (props: CelebPageMainProps) => {
  const [showFootnotes, setShowFootnotes] = useState(false);
  const oldContent = props.celeb.oldContent!;

  return (
    <article
      className="flex flex-col gap-5"
      onClick={(e) => {
        if (
          (e.target as Element)?.parentElement?.classList.contains(
            'footnote-ref',
          )
        ) {
          setShowFootnotes(true);
        }
      }}
    >
      {oldContent.summaries && (
        <TitledCard titledContentProps={{ title: 'Summary' }}>
          <div className="flex flex-col gap-5 p-5" id="editorial-summary">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Religion</h3>
              <p>{oldContent.summaries.religion}</p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Political views</h3>
              <p>{oldContent.summaries.politicalViews}</p>
            </div>
          </div>
        </TitledCard>
      )}

      {/* {isEmpty(props.facts) && (
        <InFeedAd key={`article-ad-${props.celeb.slug}`} />
      )} */}

      <TitledCard titledContentProps={{ title: 'Editorial' }}>
        <div className={s.Article}>
          <div
            id="editorial"
            className={c('break-normal p-5 pb-0 leading-relaxed', {
              'show-footnotes': showFootnotes,
            })}
            dangerouslySetInnerHTML={{ __html: props.wiki.content }}
          />

          <button
            className="px-5 pb-5 text-sm text-gray-500"
            onClick={() => setShowFootnotes(!showFootnotes)}
          >
            ({showFootnotes ? 'Hide footnotes' : 'Show footnotes'})
          </button>
        </div>
      </TitledCard>
    </article>
  );
};
