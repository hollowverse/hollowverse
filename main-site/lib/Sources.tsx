import clsx from 'clsx';
import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { CelebPageProps } from '~/lib/celebPage.getStaticProps';

export const Sources = (
  props: CelebPageProps & {
    setShowSources: React.Dispatch<React.SetStateAction<boolean>>;
    showSources: boolean;
  },
) => {
  const oldContent = props.celeb.oldContent!;

  return (
    <div className="ml-5">
      <button
        className={clsx(
          `flex min-w-[275px] items-center justify-center gap-1.5 rounded-lg border-2 border-gray-100 bg-black bg-opacity-5 px-3.5 py-2.5 font-medium transition hover:bg-opacity-10 focus:border-blue-300 active:bg-opacity-10`,
          { 'bg-opacity-10': props.showSources },
        )}
        onClick={() => props.setShowSources(!props.showSources)}
      >
        {props.showSources ? 'Hide' : 'Show'} sources for the editorial
        <FaChevronDown
          className={
            props.showSources
              ? '-rotate-180 text-sm transition duration-300'
              : 'text-sm transition duration-300'
          }
        />
      </button>

      {props.showSources && (
        <ul className="mt-5 flex flex-col gap-2.5 font-medium text-blue-600">
          {oldContent.sources.map(({ sourceTitle, sourceUrl }) => {
            const encoded = encodeURIComponent(sourceUrl);
            return (
              <li key={encoded} id={encoded}>
                <a
                  href={sourceUrl}
                  rel="noreferrer"
                  target="_blank"
                  className="rounded-lg p-1 active:bg-black active:bg-opacity-5"
                >
                  {sourceTitle}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
