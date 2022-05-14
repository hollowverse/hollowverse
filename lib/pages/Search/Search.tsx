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
import { c } from '~/lib/pages/utils/c';

export const Search = () => {
  const hook = useSearch();
  const { results, hasHvResults } = hook.searchResults || {};

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
        <div className="mx-auto mb-5 flex min-h-full w-full max-w-3xl flex-1 flex-col items-stretch text-neutral-600">
          {(hook.loading && <ThreeDots fill="#9c9c9c" width="2.5rem" />) ||
            (!isArray(results) && (
              <p className="flex flex-1 items-center justify-center text-xl text-neutral-400">
                Search for a celebrity!
              </p>
            )) ||
            (isEmpty(results) && (
              <div className="flex flex-1 items-center justify-center text-xl text-neutral-400">
                We couldn&apos;t find anyone by that name!
              </div>
            )) || (
              <div className="flex w-full flex-col lg:my-5 lg:gap-5">
                {results?.map((r: any, i: any) => {
                  return (
                    <Link
                      key={r.result['@id']}
                      href={`/${
                        r.result.slug ||
                        '~kg/' + encodeURIComponent(r.result['@id'])
                      }`}
                      passHref
                    >
                      <a
                        className={c(
                          'relative grid w-full grid-cols-10 items-stretch overflow-hidden bg-white lg:border-x lg:border-t',
                          { 'opacity-[70%]': !r.result.slug && hasHvResults },
                        )}
                      >
                        <div className="col-span-2 overflow-hidden lg:border-b">
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
                        <div className="align-center col-span-8 flex h-full flex-col justify-center border-b px-5">
                          <p className="truncate text-lg font-semibold">
                            {r.result.name}
                          </p>
                          <p className="text-xs text-gray-500 xs:text-base">
                            {r.result.description}
                          </p>
                        </div>
                        {!r.result.slug && (
                          <div className="absolute right-0 top-1 bottom-1 my-auto mr-[3%] flex flex-col justify-center bg-gradient-to-r from-transparent via-white to-white pl-20">
                            <div className="rounded-full border border-gray-300 bg-white px-5 py-1 text-xs text-gray-500 xs:text-sm">
                              Request
                            </div>
                          </div>
                        )}
                      </a>
                    </Link>
                  );
                })}
              </div>
            )}
        </div>
      </Page>
    </>
  );
};
