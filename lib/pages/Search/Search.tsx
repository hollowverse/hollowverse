/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { isArray, isEmpty } from 'lodash-es';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import { FaChevronLeft } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import * as AppBar from '~/lib/pages/components/AppBar';
import { Page } from '~/lib/pages/components/Page';
import { useSearch } from '~/lib/pages/Search/useSearch';
import { ThreeDots } from 'react-loading-icons';

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
            <div className="relative flex w-full items-center text-neutral-700">
              <Link href="/" passHref>
                <a
                  onClick={(e) => {
                    if (hook.isInternalNavigation) {
                      e.preventDefault();
                      hook.goBack();
                    }
                  }}
                  className="mr-2.5 rounded-md bg-gray-100 p-2.5 hover:bg-gray-200 active:bg-gray-200"
                >
                  <FaChevronLeft />
                </a>
              </Link>

              <DebounceInput
                placeholder="Search Hollowverse"
                className="textbox-border w-full px-3 pb-1 pt-1.5 text-[1rem]"
                value={hook.query}
                inputRef={hook.inputRef}
                minLength={2}
                debounceTimeout={600}
                onChange={hook.onQueryChange}
              />

              {!isEmpty(hook.query) && (
                <button
                  onClick={hook.onClearResultsClick}
                  className="absolute right-2.5"
                >
                  <MdCancel className="text-lg text-neutral-500" />
                </button>
              )}
            </div>
          </AppBar.Container>
        }
      >
        <div className="flex min-h-[calc(75vh-323.5px-70px)] flex-col items-center justify-center text-neutral-600 sm:gap-5 sm:p-5">
          {(hook.loading && <ThreeDots fill="#9c9c9c" width="2.5rem" />) ||
            (!isArray(hook.searchResults) && (
              <div className="text-neutral-400">Search for something!</div>
            )) ||
            (isEmpty(hook.searchResults) && (
              <div className="text-neutral-400">No results</div>
            )) ||
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
                  <a className="mx-auto flex w-full max-w-4xl items-center border-b bg-white p-5 last:border-0 sm:rounded-md">
                    <div className="h-full w-1/4 overflow-hidden rounded-md shadow-md">
                      <Image
                        src={r.result.image?.contentUrl}
                        layout="responsive"
                        objectFit="cover"
                        objectPosition="center"
                        width={150}
                        height={150}
                        alt={r.result.name}
                      />
                    </div>
                    <div className="px-5">
                      <p className="text-lg font-semibold">{r.result.name}</p>
                      <p>{r.result.description}</p>
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
