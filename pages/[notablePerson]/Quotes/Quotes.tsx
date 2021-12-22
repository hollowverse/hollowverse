import React from 'react';
import s from '../notablePerson.module.scss';
import { Divider, Typography } from '@mui/material';
import { TNotablePersonData, TPic } from '_r/pages/common/types';
import Image from 'next/image';
import { format, parse } from 'date-fns';
import { EditButton } from '../common/EditButton/EditButton';

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
          <div className={s.quoteTextContainer}>
            <div className={s.quoteAvatar}>
              <Image src={p.pic} alt={p.data.name} width={50} height={50} />
            </div>

            <figure className={s.quoteText}>
              <Typography
                variant="h4"
                component="cite"
                className={s.quoteContext}
              >
                {context}
              </Typography>

              <Typography variant="h2" component="blockquote" cite={source}>
                {text}
              </Typography>

              {(source || date) && (
                <Typography
                  variant="body1"
                  component="figcaption"
                  className={s.quoteTextFooter}
                >
                  {date && (
                    <time>
                      {format(
                        parse(date, 'MM-dd-yyyy', new Date()),
                        'MMM do yyyy',
                      )}
                    </time>
                  )}
                  {source && date && ' • '}
                  {source && (
                    <a href={source} rel="noopener" target="_blank">
                      Source
                    </a>
                  )}
                </Typography>
              )}
            </figure>
          </div>

          {i != p.data.quotes.length - 1 && <Divider />}
        </div>
      ))}

      <div className={s.quoteEditButtonContainer}>
        <EditButton type="quote" data={p.data} />
      </div>
    </>
  );
};
