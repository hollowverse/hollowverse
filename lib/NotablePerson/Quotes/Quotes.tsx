import 'normalize.css';

import React from 'react';
import s from '../notablePerson.module.scss';
import { Divider, Typography } from '@mui/material';
import { TNotablePersonData, TPic } from '_l/types';
import Image from 'next/image';
import { format, parse } from 'date-fns';

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

      {p.data.quotes.map(([context, text, source, date], i) => (
        <div className={s.quoteBlock} key={i}>
          <Typography variant="h4" component="p" className={s.quoteContext}>
            {context}
          </Typography>

          <div className={s.quoteTextContainer}>
            <div className={s.quoteAvatar}>
              <Image src={p.pic} alt={p.data.name} width={50} height={50} />
            </div>
            <div className={s.quoteText}>
              <Typography variant="h2" component="p">
                {text}
              </Typography>

              {(source || date) && (
                <Typography variant="body1" className={s.quoteTextFooter}>
                  {date &&
                    format(
                      parse(date, 'MM-dd-yyyy', new Date()),
                      'MMM do yyyy',
                    )}
                  {source && date && ' • '}
                  {source && (
                    <a href={source} rel="external" target="_blank">
                      Source
                    </a>
                  )}
                </Typography>
              )}
            </div>
          </div>

          {i != p.data.quotes.length - 1 && <Divider />}
        </div>
      ))}
    </>
  );
};
