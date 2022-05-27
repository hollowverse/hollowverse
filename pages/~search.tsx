/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { isArray, isEmpty } from 'lodash-es';
import Link from 'next/link';
import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import { FaChevronLeft } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import * as AppBar from '~/components/AppBar';
import { Page } from '~/components/Page';
import { Spinner } from '~/components/Spinner';
import { BeforeResultsContainer } from '~/components/BeforeResultsContainer';
import { SearchResults } from '~/components/SearchResults';
import { useSearch } from '~/components/hooks/useSearch';

export default function Search() {
  const hook = useSearch();

  return (
    <Page
      title={`Search the religions and political views of celebrities`}
      description={`Search the religions and political views of celebrities`}
      pathname={`~search`}
      allowSearchEngines
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
              className="textbox-border w-full px-3 pb-1 pt-1.5 text-[1rem] shadow-inner"
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
        {(hook.loading && (
          <BeforeResultsContainer>
            <Spinner />
          </BeforeResultsContainer>
        )) ||
          (!isArray(hook.searchResults?.results) && (
            <BeforeResultsContainer>
              Search for a celebrity!
            </BeforeResultsContainer>
          )) ||
          (isEmpty(hook.searchResults?.results) && (
            <BeforeResultsContainer>
              We couldn&apos;t find anyone by that name!
            </BeforeResultsContainer>
          )) || <SearchResults {...hook.searchResults!} />}
      </div>
    </Page>
  );
}
