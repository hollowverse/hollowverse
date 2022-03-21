import { Button, Container } from '@mui/material';
import React from 'react';
import { useCelebContext } from '~/pages/components/StaticPropsContextProvider';
import { Icon } from '~/pages/components/Icon';
import BookOpenIcon from '~/public/images/icons/book-open.svg';
import s from './Sources.module.scss';

export const Sources = (p: {
  setShowSources: React.Dispatch<React.SetStateAction<boolean>>;
  showSources: boolean;
}) => {
  const context = useCelebContext();
  const oldContent = context.celeb.oldContent!;

  return (
    <Container maxWidth="md" component="section" className={s.Sources}>
      <Button
        color="inherit"
        variant="text"
        size="large"
        onClick={() => p.setShowSources(!p.showSources)}
        startIcon={<Icon component={BookOpenIcon} />}
      >
        {p.showSources ? 'Hide' : 'Show'} sources for the editorial
      </Button>

      {p.showSources && (
        <ul>
          {oldContent.sources.map(({ sourceTitle, sourceUrl }) => {
            const encoded = encodeURIComponent(sourceUrl);
            return (
              <li key={encoded} id={encoded} className={s.listItem}>
                <a
                  href={sourceUrl}
                  rel="noreferrer"
                  target="_blank"
                  className={s.source}
                >
                  {sourceTitle}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </Container>
  );
};
