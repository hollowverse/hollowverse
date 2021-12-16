import 'normalize.css';

import React, { useState } from 'react';
import * as s from '../notablePerson.module.scss';
import { Button, Typography } from '@mui/material';
import pen from '_i/icons/pen.svg';
import bookOpen from '_i/icons/book-open.svg';
import stars from '_i/icons/stars.svg';
import { InterestingProfiles } from './InterestingProfiles/InterestingProfiles';
import { InterestingProfiles as TInterestingProfiles } from '_c/types';

export const Editorial = (p: {
  editorial: string;
  sources: [string, string][];
  interestingProfiles: TInterestingProfiles;
}) => {
  const [showSources, setShowSources] = useState(false);

  return (
    <>
      <Typography variant="h1" component="h3">
        <img width="25" src={pen} alt="Pen" />
        <span style={{ marginLeft: '10px' }}>Editorial</span>
      </Typography>

      <div
        className={s.editorialContent}
        dangerouslySetInnerHTML={{ __html: p.editorial }}
      ></div>

      <div className={s.sourcesTitleContainer}>
        <Typography variant="h3" component="h4"></Typography>
        <Button
          variant="text"
          size="large"
          onClick={() => setShowSources(!showSources)}
          style={{ textTransform: 'none' }}
        >
          <img width="15" src={bookOpen} alt="Book open" />
          <span style={{ marginLeft: '10px' }}>
            {showSources ? 'Hide' : 'Show'} sources for the editorial
          </span>
        </Button>
      </div>

      {showSources && (
        <ol>
          {p.sources.map(([title, url]) => {
            return (
              <li key={url} className={s.editorialListItem}>
                <a
                  href={url}
                  rel="external"
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
          <img width="25" src={stars} alt="Stars" />
          <span style={{ marginLeft: '10px' }}>Other interesting profiles</span>
        </Typography>

        <div className={s.interestingProfiles}>
          <InterestingProfiles interestingProfiles={p.interestingProfiles} />
        </div>
      </div>
    </>
  );
};
