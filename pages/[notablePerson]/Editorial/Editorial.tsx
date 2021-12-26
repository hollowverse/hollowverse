import 'normalize.css';

import React, { useState } from 'react';
import s from '../notablePerson.module.scss';
import { Button, Divider, Paper, Typography } from '@mui/material';
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
      {/* <Typography variant="h1" component="h3">
        <Icon component={PenIcon}></Icon>
        Editorial
      </Typography> */}

      {/* {p.editorial.data.summaries && (
        <div>

        </div>
      )} */}

      <article
        className={s.editorialContent}
        onClick={(e) => {
          if ((e.target as Element).classList.contains('source-citation')) {
            setShowSources(true);
          }
        }}
      >
        {p.editorial.data.summaries && (
          <Paper style={{ padding: 10 }} variant="outlined">
            <p>{p.editorial.data.summaries.religion}</p>
            <p>{p.editorial.data.summaries.politicalViews}</p>
          </Paper>
        )}

        <div dangerouslySetInnerHTML={{ __html: p.editorial.content }}></div>
      </article>

      {p.editorial.data.sources && p.editorial.data.sources.length > 0 && (
        <>
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
            <ul>
              {p.editorial.data.sources.map(({ sourceTitle, sourceUrl }) => {
                const encoded = encodeURIComponent(sourceUrl);
                return (
                  <li
                    key={encoded}
                    id={encoded}
                    className={s.editorialListItem}
                  >
                    <a
                      href={sourceUrl}
                      rel="noreferrer"
                      target="_blank"
                      className={s.editorialSource}
                    >
                      {sourceTitle}
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </>
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
