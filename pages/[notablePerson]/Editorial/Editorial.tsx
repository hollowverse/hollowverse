import 'normalize.css';

import React, { useState } from 'react';
import s from '../notablePerson.module.scss';
import { Button, Typography } from '@mui/material';
import { InterestingProfiles } from './InterestingProfiles/InterestingProfiles';
import { TEditorial } from '_r/pages/common/types';
import StarsIcon from '_i/icons/stars.svg';
import { Icon } from '_r/pages/common/Icon';
import PenIcon from '_i/icons/pen.svg';
import BookOpenIcon from '_i/icons/book-open.svg';

export const Editorial = (p: { editorial: TEditorial }) => {
  const [showSources, setShowSources] = useState(false);

  return (
    <>
      <Typography variant="h1" component="h3">
        <Icon component={PenIcon}></Icon>
        Editorial
      </Typography>

      <article
        className={s.editorialContent}
        dangerouslySetInnerHTML={{ __html: p.editorial.content }}
      />

      <div className={s.sourcesTitleContainer}>
        <Typography variant="h3" component="h4"></Typography>

        <Button
          color="inherit"
          variant="text"
          size="large"
          onClick={() => setShowSources(!showSources)}
          startIcon={<Icon component={BookOpenIcon}></Icon>}
        >
          {showSources ? 'Hide' : 'Show'} sources for the editorial
        </Button>
      </div>

      {showSources && (
        <ol>
          {p.editorial.data.sources.map(([title, url]) => {
            return (
              <li key={url} className={s.editorialListItem}>
                <a
                  href={url}
                  rel="noreferrer"
                  target="_blank"
                  className={s.editorialSource}
                >
                  {title}
                </a>
              </li>
            );
          })}
        </ol>
      )}

      <div className={s.interestingProfilesContainer}>
        <Typography variant="h1" component="h3">
          <Icon component={StarsIcon} />
          Other interesting profiles
        </Typography>

        <div className={s.interestingProfiles}>
          <InterestingProfiles
            interestingProfiles={p.editorial.data.interestingProfiles}
          />
        </div>
      </div>
    </>
  );
};
