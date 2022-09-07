import { Alert, Avatar } from '@mui/material';
import { useState } from 'react';
import { FaInfoCircle, FaRegEdit } from 'react-icons/fa';
import { CelebPageMainProps } from '~/lib/celebPageMain.getStaticProps';
import { Sources } from '~/lib/Sources';
import { Article } from './Article';
import { InterestingProfiles } from './InterestingProfiles';

export const Md = (props: CelebPageMainProps) => {
  const oldContent = props.celeb.oldContent!;

  return (
    <section className="flex flex-col gap-5">
      <Article {...props} />

      {/* {oldContent.sources?.length > 0 && (
        <Sources
          showSources={showSources}
          setShowSources={setShowSources}
          {...props}
        />
      )} */}

      <div className="px-1">
        <Alert severity="info">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p>
                This wiki was last updated on{' '}
                <span className="underline">June 12th 2012</span> by:
              </p>

              <div className="flex items-center gap-3">
                <Avatar
                  alt="Tom Kershaw"
                  src="https://forum.hollowverse.com/user_avatar/forum.hollowverse.com/tkershaw3/90/1361_2.png"
                />
                <p className="text-md font-bold">Tom Kershaw</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p>Today we're opening contributions to all readers.</p>

              <p>
                <span className="underline">We invite you</span> and ask you to
                please help us update this wiki by editing it.
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a
                  href="/"
                  className="flex items-center gap-2 rounded-md bg-blue-500 py-2 px-5 text-white shadow-md"
                  title="asdf"
                >
                  <FaRegEdit /> Edit this wiki
                </a>

                <a
                  href="/"
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

      <InterestingProfiles {...props} />
    </section>
  );
};
