import 'normalize.css';

import React, { useState } from 'react';
import s from '../notablePerson.module.scss';
import { Button, Typography } from '@mui/material';
import { InterestingProfiles } from './InterestingProfiles/InterestingProfiles';
import { TEditorial } from '_l/types';
import Image from 'next/image';

export const Editorial = (p: { editorial: TEditorial }) => {
  const [showSources, setShowSources] = useState(false);

  return (
    <>
      <Typography variant="h1" component="h3">
        <Image width={25} height={25} src="/images/icons/pen.svg" alt="Pen" />
        <span style={{ marginLeft: '10px' }}>Editorial</span>
      </Typography>

      <div
        className={s.editorialContent}
        dangerouslySetInnerHTML={{ __html: p.editorial.content }}
      ></div>

      <div className={s.sourcesTitleContainer}>
        <Typography variant="h3" component="h4"></Typography>

        <Button
          color="inherit"
          variant="text"
          size="large"
          onClick={() => setShowSources(!showSources)}
          startIcon={
            <Image
              width={15}
              height={15}
              src="/images/icons/book-open.svg"
              alt="Book open"
            />
          }
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
          <Image
            height={25}
            width={25}
            src="/images/icons/stars.svg"
            alt="Stars"
          />
          <span style={{ marginLeft: '10px' }}>Other interesting profiles</span>
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
