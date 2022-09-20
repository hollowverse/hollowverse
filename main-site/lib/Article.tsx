/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Alert, Avatar } from '@mui/material';
import React, { useState } from 'react';
import { FaInfoCircle, FaRegEdit } from 'react-icons/fa';
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
        <div className={c(s.Article, 'pb-2')}>
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

          <div className="px-1">
            <Alert severity="info" className="m-2">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <p>
                    This wiki was last updated on{' '}
                    <span className="underline">{props.wiki.date}</span> by:
                  </p>

                  <div className="flex items-center gap-3">
                    <Avatar
                      alt={props.wiki.name}
                      src={`https://forum.hollowverse.com/${props.wiki.avatar.replace(
                        '{size}',
                        '90',
                      )}`}
                    />
                    <p className="text-md font-bold">{props.wiki.name}</p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <p>Today we're opening contributions to all readers.</p>

                  <p>
                    <span className="underline">We invite you</span> and ask you
                    to help us update this wiki by editing it.
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <a
                      href={props.celeb.wiki!}
                      className="flex items-center gap-2 rounded-md bg-blue-500 py-2 px-5 text-white shadow-md"
                    >
                      <FaRegEdit /> Edit this wiki
                    </a>

                    <a
                      href="https://forum.hollowverse.com/t/how-to-edit-or-create-a-wiki/7333"
                      className="flex items-center gap-2 rounded-md border border-blue-400 px-5 py-2 shadow-sm"
                    >
                      <FaInfoCircle />
                      How to edit this wiki
                    </a>
                  </div>
                </div>
              </div>
            </Alert>
          </div>
        </div>
      </TitledCard>
    </article>
  );
};
