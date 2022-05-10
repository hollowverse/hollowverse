/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { isArray, isEmpty, isString } from 'lodash-es';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import { Page } from '~/lib/pages/components/Page';
import { useSearch } from '~/lib/pages/Search/useSearch';
import * as AppBar from '~/lib/pages/components/AppBar';

export const Search = () => {
  const hook = useSearch();

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <Page
        appBar={
          <AppBar.Container>
            <div style={{ display: 'flex' }}>
              <DebounceInput
                className="border"
                value={hook.query}
                inputRef={hook.inputRef}
                minLength={2}
                debounceTimeout={600}
                onChange={hook.onQueryChange}
              />

              {!isEmpty(hook.query) && (
                <button onClick={hook.onClearResultsClick}>Clear search</button>
              )}

              <div style={{ marginLeft: 10 }}>
                <Link href="/" passHref>
                  <a
                    onClick={(e) => {
                      if (hook.isInternalNavigation) {
                        e.preventDefault();
                        hook.goBack();
                      }
                    }}
                  >
                    Cancel
                  </a>
                </Link>
              </div>
            </div>
          </AppBar.Container>
        }
      >
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
                      <p>Exists: {r.result.slug ? 'yes' : 'no'}</p>
                    </div>
                  </a>
                </Link>
              );
            })}
        </div>
      </Page>
    </>
  );
};
