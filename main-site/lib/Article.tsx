/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { c } from '~/lib/c';
import { CelebPageMainProps } from '~/lib/celebPageMain.getStaticProps';
import { TitledCard } from '~/lib/TitledCard.ui';
import s from '~/styles/styles.module.scss';

export const Article = (props: CelebPageMainProps) => {
  const [showFootnotes, setShowFootnotes] = useState(false);

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
      <TitledCard
        titledContentProps={{
          title: (
            <span className="flex gap-3">
              Wiki{' '}
              <a
                href={props.celeb.wiki!}
                className="h-link flex items-center text-base font-normal"
              >
                <span className="flex items-center gap-1 ">
                  <FaRegEdit /> Edit
                </span>
              </a>
            </span>
          ),
        }}
      >
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
