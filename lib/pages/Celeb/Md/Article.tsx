/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { ForumInvite } from '~/lib/pages/Celeb/ForumInvite';
import { Card } from '~/lib/pages/components/Card';
import { useCelebContext } from '~/lib/pages/components/StaticPropsContextProvider';
import s from '~/lib/pages/styles.module.scss';
import { c } from '~/lib/pages/utils/c';

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
          <p className="mt-3">{oldContent.summaries.politicalViews}</p>
        </Card>
      )}

      <ForumInvite name={context.celeb.name} />

      <Card title="Editorial">
        <div
          className={c(s.Article, 'break-normal leading-relaxed')}
          dangerouslySetInnerHTML={{ __html: oldContent.article }}
        />
      </Card>
    </article>
  );
};
