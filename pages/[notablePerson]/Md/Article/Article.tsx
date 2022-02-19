import { Paper } from '@mui/material';
import React from 'react';
import { Separator } from '~/components/Separator';
import { useNotablePersonContext } from '~/components/StaticPropsContextProvider';
import { NotablePersonProps } from '~/pages/[notablePerson].page';
import s from './Article.module.scss';

export const Article = (p: {
  setShowSources: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const context = useNotablePersonContext();

  return (
    <article
      className={s.Article}
      onClick={(e) => {
        if ((e.target as Element).classList.contains('source-citation')) {
          p.setShowSources(true);
        }
      }}
    >
      {context.notablePersonMd.data.summaries && (
        <div className={s.summary}>
          <Separator title="Summary" className={s.separator} />
          <p>{context.notablePersonMd.data.summaries.religion}</p>
          <p>{context.notablePersonMd.data.summaries.politicalViews}</p>
        </div>
      )}

      <Separator title="Editorial" className={s.separator} />
      <div
        dangerouslySetInnerHTML={{ __html: context.notablePersonMd.content }}
      />
    </article>
  );
};
