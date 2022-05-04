import { Container } from '@mui/material';
import Head from 'next/head';
import React, { useLayoutEffect, useState } from 'react';
import s from './styles.module.scss';
import { DebounceInput } from 'react-debounce-input';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { isString } from 'lodash-es';
import { kgCall } from '~/lib/~search/kgCall';

export const Search = () => {
  const [val, setVal] = useState('');
  const { previousUrl } = useRouter().query;

  const inputRef = React.useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <Container className={s.Contribute} maxWidth="md">
        <div style={{ display: 'flex' }}>
          <DebounceInput
            value={val}
            inputRef={inputRef}
            autoFocus
            minLength={2}
            debounceTimeout={600}
            onChange={async (event) => {
              const results = await kgCall(event.target.value);

              setVal(event.target.value);
            }}
          />

          <button onClick={() => setVal('')}>X</button>

          {isString(previousUrl) && <Link href={previousUrl}>Go back</Link>}
        </div>

        <p>Value: {val}</p>
      </Container>
    </>
  );
};
