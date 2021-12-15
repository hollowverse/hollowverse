import 'normalize.css';

import React from 'react';
import * as s from '../notablePerson.module.scss';
import { Avatar, Divider, Typography } from '@mui/material';
import { NotablePersonYml, Pic } from 'src/components/types';
import quote from '_i/icons/quote.svg';

export const Quotes = (p: { yml: NotablePersonYml; pic: Pic }) => {
  return (
    <>
      <Typography variant="h1" component="h2">
        <img width="25" src={quote} alt="Quote" />
        <span style={{ marginLeft: '10px' }}>Quotes</span>
      </Typography>

      {p.yml.quotes.map((quote, i) => (
        <div className={s.quoteBlock} key={i}>
          <Typography variant="h4" component="p" className={s.quoteContext}>
            {quote[0]}
          </Typography>

          <div className={s.quoteTextContainer}>
            <div>
              <Avatar src={p.pic}></Avatar>
            </div>
            <div className={s.quoteText}>
              <Typography variant="h2" component="p">
                {quote[1]}
              </Typography>
            </div>
          </div>

          {i != p.yml.quotes.length - 1 && <Divider />}
        </div>
      ))}
    </>
  );
};
