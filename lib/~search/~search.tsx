import { isArray, isEmpty, isString } from 'lodash-es';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useSearch } from '~/lib/~search/useSearch';

export const Search = () => {
  const hook = useSearch();

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <div>
        <div style={{ display: 'flex' }}>
          <DebounceInput
            value={hook.query}
            inputRef={hook.inputRef}
            autoFocus
            minLength={2}
            debounceTimeout={600}
            onChange={hook.onQueryChange}
          />

          <button onClick={hook.onClearResultsClick}>X</button>

          {isString(hook.previousUrl) && (
            <Link href={hook.previousUrl}>Go back</Link>
          )}
        </div>

        <div>
          {(hook.loading && <div>loading...</div>) ||
            (!isArray(hook.searchResults) && (
              <div>Search for something!</div>
            )) ||
            (isEmpty(hook.searchResults) && <div>No results</div>) ||
            hook.searchResults?.map((r: any) => {
              return (
                <Link
                  key={r.result['@id']}
                  href={`/${
                    r.result.slug ||
                    '~kg/' + encodeURIComponent(r.result['@id'])
                  }`}
                  passHref
                >
                  <a style={{ display: 'flex' }}>
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
                  </a>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
};
