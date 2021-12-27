import { Button, Typography } from '@mui/material';
import React from 'react';
import BookOpenIcon from '_i/icons/book-open.svg';
import { Icon } from '_r/pages/common/Icon';
import { NotablePersonProps } from '_r/pages/[notablePerson].page';
import s from './Sources.module.scss';

export const Sources = (p: {
  notablePersonMd: NonNullable<NotablePersonProps['notablePersonMd']>;
  setShowSources: React.Dispatch<React.SetStateAction<boolean>>;
  showSources: boolean;
}) => (
  <section className={s.Sources}>
    <div className={s.titleContainer}>
      <Typography variant="h3" component="h4" />

      <Button
        color="inherit"
        variant="text"
        size="large"
        onClick={() => p.setShowSources(!p.showSources)}
        startIcon={<Icon component={BookOpenIcon} />}
      >
        {p.showSources ? 'Hide' : 'Show'} sources for the editorial
      </Button>
    </div>

    {p.showSources && (
      <ul>
        {p.notablePersonMd.data.sources.map(({ sourceTitle, sourceUrl }) => {
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
  </section>
);
