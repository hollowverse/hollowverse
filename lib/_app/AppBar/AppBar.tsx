import Link from 'next/link';
import React, { useState } from 'react';

export const AppBar = () => {
  return (
    <>
      <aside className="h-1 w-full bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400" />
      <nav
        role="navigation"
        aria-label="Main Navigation"
        className="NAV-CONTAINER flex w-full border-b bg-white py-4 px-4 text-neutral-600"
      >
        <div className="NAV mx-auto flex w-full max-w-5xl items-center justify-between">
          <Link passHref href="/">
            <a className="NAV-LOGO cursor-pointer select-none bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text font-extrabold uppercase tracking-tight text-transparent sm:text-xl lg:text-2xl">
              Hollowverse
            </a>
          </Link>
          <div className="NAV-LINKS flex items-center gap-2.5">
            <input
              aria-label="searchbox"
              role="search"
              className="w-24 rounded-lg border-[3.5px] border-white bg-gray-100 px-2.5 py-1.5 text-sm placeholder-neutral-400 outline-none transition hover:bg-gray-100 focus:border-blue-300 md:w-40"
              placeholder="Search..."
            />
          </div>
        </div>
      </nav>
    </>
  );
};
