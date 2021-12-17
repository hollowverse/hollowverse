import 'normalize.css';

import React from 'react';
import s from '../notablePerson.module.scss';
import { Divider, Typography } from '@mui/material';
import { TNotablePersonData, TPic } from '_l/types';
import quote from '_i/icons/quote.svg';
import Image from 'next/image';

export const Quotes = (p: { data: TNotablePersonData; pic: TPic }) => {
  return (
    <>
      <Typography variant="h1" component="h2">
        <Image
          width={25}
          height={25}
          src="/images/icons/quote.svg"
          alt="Quote"
        />
        <span style={{ marginLeft: '10px' }}>Quotes</span>
      </Typography>

      {p.data.quotes.map((quote, i) => (
        <div className={s.quoteBlock} key={i}>
          <Typography variant="h4" component="p" className={s.quoteContext}>
            {quote[0]}
          </Typography>

          <div className={s.quoteTextContainer}>
            <div className={s.quoteAvatar}>
              <Image src={p.pic} alt={p.data.name} width={50} height={50} />
            </div>
            <div className={s.quoteText}>
              <Typography variant="h2" component="p">
                {quote[1]}
              </Typography>
            </div>
          </div>

          {i != p.data.quotes.length - 1 && <Divider />}
        </div>
      ))}
    </>
  );
};
