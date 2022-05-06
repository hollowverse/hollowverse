import { Container } from '@mui/material';
import Head from 'next/head';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import s from './styles.module.scss';
import { DebounceInput } from 'react-debounce-input';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { isString } from 'lodash-es';
import { kgCall } from '~/lib/~search/kgCall';
import Image from 'next/image';

export const Search = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const { previousUrl } = useRouter().query;

  const inputRef = React.useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    inputRef?.current?.focus();
  }, []);

  useEffect(() => {
    async function runQuery() {
      if (query) {
        setResults(null);
        setLoading(true);

        const response = await kgCall(query);

        setResults(response);
        setLoading(false);
      }
    }

    runQuery();
  }, [query]);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <Container className={s.Contribute} maxWidth="md">
        <div style={{ display: 'flex' }}>
          <DebounceInput
            value={query}
            inputRef={inputRef}
            autoFocus
            minLength={2}
            debounceTimeout={600}
            onChange={async (event) => {
              setQuery(event.target.value);
            }}
          />

          <button
            onClick={() => {
              setQuery('');
              setResults(null);
            }}
          >
            X
          </button>

          {isString(previousUrl) && <Link href={previousUrl}>Go back</Link>}
        </div>

        <div>
          {loading && <div>loading...</div>}

          {results?.map((r: any) => {
            return (
              <div key={r.result['@id']} style={{ display: 'flex' }}>
                <div style={{ width: 100 }}>
                  <Image
                    src={r.result.image?.contentUrl}
                    layout="responsive"
                    objectFit="cover"
                    objectPosition="top"
                    width={150}
                    height={150}
                    alt={r.result.name}
                  />
                </div>
                <div>
                  <p>Name: {r.result.name}</p>
                  <p>Description: {r.result.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
};
