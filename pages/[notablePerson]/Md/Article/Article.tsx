import { Paper } from '@mui/material';
import React from 'react';
import { NotablePersonProps } from '_r/pages/[notablePerson].page';
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
      <Paper style={{ padding: 10 }} variant="outlined">
        <p>{p.notablePersonMd.data.summaries.religion}</p>
        <p>{p.notablePersonMd.data.summaries.politicalViews}</p>
      </Paper>
    )}

    <div dangerouslySetInnerHTML={{ __html: p.notablePersonMd.content }} />
  </article>
);
