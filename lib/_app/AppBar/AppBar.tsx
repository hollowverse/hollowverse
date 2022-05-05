import Link from 'next/link';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export const AppBar = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400" />
      <nav className="NAV-CONTAINER flex w-full border-b bg-white py-4 px-4 text-neutral-600">
        <div className="NAV mx-auto flex w-full max-w-5xl items-center justify-between">
          <Link passHref href="/">
            <div className="NAV-LOGO cursor-pointer select-none bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text font-extrabold tracking-tight text-transparent sm:text-xl lg:text-2xl">
              HOLLOWVERSE
            </div>
          </Link>
          <div className="NAV-LINKS flex gap-2.5">
            {showSearch && (
              <input
                className="h-[32px] w-24 rounded-lg bg-gray-100 px-2.5 placeholder-gray-400 transition hover:bg-gray-200 md:w-40"
                placeholder="Search..."
              />
            )}
            <button
              onClick={() => {
                !showSearch ? setShowSearch(true) : setShowSearch(false);
              }}
              className="rounded-lg bg-gray-100 p-2 transition hover:bg-gray-200 active:bg-gray-300"
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
