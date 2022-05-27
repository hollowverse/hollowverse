/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Card } from '~/components/Card';
import s from '~/styles/styles.module.scss';
import { c } from '~/lib/c';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';

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
        <Card title="Summary">
          <p>{oldContent.summaries.religion}</p>
          <p className="mt-3">{oldContent.summaries.politicalViews}</p>
        </Card>
      )}

      <Card title="Editorial">
        <div
          className={c(s.Article, 'break-normal leading-relaxed')}
          dangerouslySetInnerHTML={{ __html: oldContent.article }}
        />
      </Card>
    </article>
  );
};
