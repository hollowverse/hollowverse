import { Container } from '@mui/material';
import Head from 'next/head';
import React, { useLayoutEffect, useState } from 'react';
import s from './styles.module.scss';
import { DebounceInput } from 'react-debounce-input';

export const Search = () => {
  const [val, setVal] = useState('');

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
        <DebounceInput
          inputRef={inputRef}
          autoFocus
          minLength={2}
          debounceTimeout={300}
          onChange={(event) => setVal(event.target.value)}
        />

        <p>Value: {val}</p>
      </Container>
    </>
  );
};
