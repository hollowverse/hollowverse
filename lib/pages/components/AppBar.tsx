import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { FaSearch } from 'react-icons/fa';
import { LovelyTopBorder } from '~/lib/pages/components/LovelyTopBorder';

export function Container(params: { children: ReactNode }) {
  return (
    <>
      <LovelyTopBorder />
      <nav
        role="navigation"
        aria-label="Main Navigation"
        className="NAV-CONTAINER flex h-[70px] w-full border-b bg-white py-5 px-5 text-neutral-600"
      >
        <div className="NAV mx-auto flex w-full max-w-4xl flex-row items-center justify-between gap-2">
          {params.children}
        </div>
      </nav>
    </>
  );
}

export function Logo() {
  return (
    <div className="LOGO flex w-full items-center">
      <Link passHref href="/">
        <a className="w-fit cursor-pointer select-none bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-2xl font-extrabold uppercase tracking-tight text-transparent">
          Hollowverse
        </a>
      </Link>
    </div>
  );
}

export function SearchButton() {
  const router = useRouter();

  return (
    <Link
      href={{
        pathname: '/~search',
        query: { local: true },
      }}
      passHref
    >
      <a className="TOGGLE-BUTTON flex self-center rounded-md border-2 border-white bg-gray-100 p-2 transition hover:bg-gray-200 focus:border-blue-300">
        <FaSearch />
      </a>
    </Link>
  );
}

export const AppBar = () => {
  return (
    <Container>
      <Logo />
      <SearchButton />
    </Container>
  );
};
