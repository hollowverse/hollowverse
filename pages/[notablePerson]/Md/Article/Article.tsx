import { Container, Paper } from '@mui/material';
import React from 'react';
import { Separator } from '~/pages/components/Separator';
import { useNotablePersonContext } from '~/pages/components/StaticPropsContextProvider';
import { NotablePersonProps } from '~/pages/[notablePerson]/index.page';
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
        <div>
          <Separator title="Summary" className={s.separator} />
          <Container maxWidth="md">
            <p>{context.notablePersonMd.data.summaries.religion}</p>
            <p>{context.notablePersonMd.data.summaries.politicalViews}</p>
          </Container>
        </div>
      )}

      <div>
        <Separator
          title="👋 Hey! Do you think a lot about politics and religion? 🧠"
          className={s.separator}
        />
        <Container maxWidth="md">
          <p>
            Win a $20 Amazon gift card by becoming a top contributor on
            Hollowverse!
          </p>
        </Container>
      </div>

      <Separator title="Editorial" className={s.separator} />
      <Container
        maxWidth="md"
        dangerouslySetInnerHTML={{ __html: context.notablePersonMd.content }}
      />
    </article>
  );
};
