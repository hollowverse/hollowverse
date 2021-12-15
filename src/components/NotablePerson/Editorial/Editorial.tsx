import 'normalize.css';

import React from 'react';
import * as s from '../notablePerson.module.scss';
import { Typography } from '@mui/material';
import pen from '_i/icons/pen.svg';
import bookOpen from '_i/icons/book-open.svg';
import stars from '_i/icons/stars.svg';

export const Editorial = (p: {
  editorial: string;
  sources: [string, string][];
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
        <span style={{ marginLeft: '10px' }}>Editorial sources</span>
      </Typography>

      <ol>
        {p.sources.map((source) => {
          return (
            <li>
              <a href={source[1]} rel="external" target="_blank">
                {source[0]}
              </a>
            </li>
          );
        })}
      </ol>

      <Typography
        variant="h1"
        component="h3"
        className={s.otherInterestingProfiles}
      >
        <img width="25" src={stars} alt="Stars" />
        <span style={{ marginLeft: '10px' }}>Other interesting profiles</span>
      </Typography>
    </>
  );
};
