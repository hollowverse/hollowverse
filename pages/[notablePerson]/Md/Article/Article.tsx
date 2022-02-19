import { Paper } from '@mui/material';
import React from 'react';
import { Separator } from '~/components/Separator';
import { NotablePersonProps } from '~/pages/[notablePerson].page';
import s from './Article.module.scss';

export const Article = (p: {
  notablePersonMd: NonNullable<NotablePersonProps['notablePersonMd']>;
  setShowSources: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <article
    className={s.Article}
    onClick={(e) => {
      if ((e.target as Element).classList.contains('source-citation')) {
        p.setShowSources(true);
      }
    }}
  >
    {p.notablePersonMd.data.summaries && (
      <div className={s.summary}>
        <Separator title="Summary" className={s.separator} />
        <p>{p.notablePersonMd.data.summaries.religion}</p>
        <p>{p.notablePersonMd.data.summaries.politicalViews}</p>
      </div>
    )}

    <Separator title="Editorial" className={s.separator} />
    <div dangerouslySetInnerHTML={{ __html: p.notablePersonMd.content }} />
  </article>
);
