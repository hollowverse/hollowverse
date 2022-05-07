import Link from 'next/link';
import React, { useState } from 'react';
import { LovelyTopBorder } from '~/lib/pages/components/LovelyTopBorder';
import s from '~/lib/pages/styles.module.scss';
import { c } from '~/lib/pages/utils/c';

export const AppBar = () => {
  const [searchStatus, setSearchStatus] = useState<'closed' | 'open'>('closed');

  return (
    <>
      <LovelyTopBorder />
      <nav
        role="navigation"
        aria-label="Main Navigation"
        className={`NAV-CONTAINER flex w-full border-b bg-white py-4 px-4 text-neutral-600 ${s.AppBar} h-[70px]`}
      >
        <div className="NAV mx-auto flex w-full max-w-4xl flex-row items-center justify-between gap-2">
          <div className="NAV-CONTENT-CONTAINER w-full">
            <Link passHref href="/">
              <a
                className={c(
                  'NAV-LOGO sm:text-xl w-fit cursor-pointer select-none bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text font-extrabold uppercase tracking-tight text-transparent lg:text-2xl',
                  searchStatus === 'closed' ? 'block' : 'hidden',
                )}
              >
                Hollowverse
              </a>
            </Link>

            <div
              className={c(
                'SEARCH',
                searchStatus === 'open' ? 'block' : 'hidden',
              )}
            >
              <div
                title="Google search results"
                data-mobilelayout="forced"
                className="gcse-search"
              />
            </div>
          </div>

          <div className="TOGGLE-BUTTON w-2/12">
            <button
              onClick={() =>
                setSearchStatus(searchStatus === 'open' ? 'closed' : 'open')
              }
            >
              {searchStatus === 'open' ? 'Close icon' : 'Search icon'}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
