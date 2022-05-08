import Link from 'next/link';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { Card } from '~/lib/pages/components/Card';
import { useCelebContext } from '~/lib/pages/components/StaticPropsContextProvider';

export const Article = (p: {
  setShowSources: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const context = useCelebContext();
  const oldContent = context.celeb.oldContent!;

  return (
    <article
      onClick={(e) => {
        if ((e.target as Element).classList.contains('source-citation')) {
          p.setShowSources(true);
        }
      }}
    >
      {oldContent.summaries && (
        <Card title="Summary">
          <p>{oldContent.summaries.religion}</p>
          <p>{oldContent.summaries.politicalViews}</p>
        </Card>
      )}

      <Card title="Hi! 👋 Do you think a lot about politics and religion? 🧠">
        <div className="flex items-center justify-between gap-5">
          <p className="m-0">
            Receive a $25 Amazon® gift card by becoming a top contributor on
            Hollowverse!
          </p>

          <div>
            <Link
              aria-label="Learn about the steps required to start contributing to Hollowverse"
              href={{
                pathname: '/~contribute',
                query: {
                  name: context.celeb.name,
                  slug: context.celeb.slug,
                },
              }}
              passHref
            >
              <a
                className="flex w-[130px] items-center gap-1 rounded-lg border-[3.5px] border-white bg-gray-100 px-3.5 py-2 transition focus:border-blue-300 active:bg-gray-200"
                aria-label="Learn about the steps required to start contributing to Hollowverse"
              >
                Learn how
                <FaChevronRight className="text-xs" />
              </a>
            </Link>
          </div>
        </div>
      </Card>

      <Card title="Editorial">
        <div
          className="break-normal leading-relaxed"
          dangerouslySetInnerHTML={{ __html: oldContent.article }}
        />
      </Card>
    </article>
  );
};
