import Link from 'next/link';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { Separator } from '~/lib/components/Separator';
import { useCelebContext } from '~/lib/components/StaticPropsContextProvider';

export const Article = (p: {
  setShowSources: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const context = useCelebContext();
  const oldContent = context.celeb.oldContent!;

  return (
    <article
      className=""
      onClick={(e) => {
        if ((e.target as Element).classList.contains('source-citation')) {
          p.setShowSources(true);
        }
      }}
    >
      {oldContent.summaries && (
        <div className="">
          <Separator title="Summary" />
          <div className="mb-5 border-b bg-white p-5 lg:border-x">
            <p>{oldContent.summaries.religion}</p>
            <p>{oldContent.summaries.politicalViews}</p>
          </div>
        </div>
      )}

      <div className="">
        <Separator title="Hi! 👋 Do you think a lot about politics and religion? 🧠" />
        <div className="mb-5 flex items-center justify-between gap-5 border-b bg-white p-5 lg:border-x">
          <div className="">
            <p>
              Receive a $25 Amazon® gift card by becoming a top contributor on
              Hollowverse!
            </p>
          </div>

          <div className="">
            <Link
              aria-label="Learn about the steps required to start contributing to Hollowverse"
              href={{
                pathname: '/~/contribute',
                query: {
                  name: context.celeb.name,
                  slug: context.celeb.slug,
                },
              }}
              passHref
            >
              <button
                className="flex w-[130px] items-center gap-1 rounded-lg border-[3.5px] border-white bg-gray-100 px-3.5 py-2 transition focus:border-blue-300 active:bg-gray-200"
                aria-label="Learn about the steps required to start contributing to Hollowverse"
              >
                Learn how
                <FaChevronRight className="text-xs" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Separator title="Editorial" />
      <div
        className="break-normal border-b bg-white p-5 leading-relaxed lg:border-x"
        dangerouslySetInnerHTML={{ __html: oldContent.article }}
      />
    </article>
  );
};
