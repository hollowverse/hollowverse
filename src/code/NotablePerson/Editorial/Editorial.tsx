import 'normalize.css';

import React from 'react';
import * as s from '../notablePerson.module.scss';
import { Typography } from '@mui/material';
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

      <Typography variant="h3" component="h4">
        <img width="15" src={bookOpen} alt="Book open" />
        <span style={{ marginLeft: '10px' }}>Sources for the editorial</span>
      </Typography>

      <ol>
        {p.sources.map(([title, url]) => {
          return (
            <li key={url}>
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
