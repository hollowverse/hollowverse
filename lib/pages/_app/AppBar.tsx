import Link from 'next/link';
import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { LovelyTopBorder } from '~/lib/pages/components/LovelyTopBorder';
import s from '~/lib/pages/styles.module.scss';
import { c } from '~/lib/pages/utils/c';

export const AppBar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <LovelyTopBorder />
      <nav
        role="navigation"
        aria-label="Main Navigation"
        className={`NAV-CONTAINER flex w-full border-b bg-white py-5 px-5 text-neutral-600 ${s.AppBar} h-[70px]`}
      >
        <div className="NAV mx-auto flex w-full max-w-4xl flex-row items-center justify-between gap-2">
          <div className="NAV-CONTENT-CONTAINER flex w-full items-center">
            <Link passHref href="/">
              <a
                className={c(
                  'NAV-LOGO w-fit cursor-pointer select-none bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-2xl font-extrabold uppercase tracking-tight text-transparent',
                  searchOpen ? 'hidden' : 'block',
                )}
              >
                Hollowverse
              </a>
            </Link>

            <div className={c('SEARCH', searchOpen ? 'mt-1 w-full' : 'hidden')}>
              <div
                title="Google search results"
                data-mobilelayout="forced"
                className="gcse-search"
              />
            </div>
          </div>

          <button
            onClick={() => setSearchOpen(searchOpen ? false : true)}
            className="TOGGLE-BUTTON flex self-center rounded-md border-2 border-white bg-gray-100 p-2 transition hover:bg-gray-200 focus:border-blue-300"
          >
            {searchOpen ? <FaTimes /> : <FaSearch />}
          </button>
        </div>
      </nav>
    </>
  );
};
