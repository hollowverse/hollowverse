import { Link } from '~/lib/Link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { FaSearch } from 'react-icons/fa';
import { LovelyTopBorder } from '~/components/LovelyTopBorder';
import { c } from '~/lib/c';

export function Container(props: { children: ReactNode; navClasses?: string }) {
  return (
    <>
      <LovelyTopBorder />
      <nav
        role="navigation"
        aria-label="Main Navigation"
        className="NAV-CONTAINER flex w-full border-b bg-white p-3 px-5 text-neutral-600"
      >
        <div
          className={c(
            'NAV h-container flex items-center justify-between px-5 default:flex-row default:gap-2',
            props.navClasses,
          )}
        >
          {props.children}
        </div>
      </nav>
    </>
  );
}

export function Logo(props: { className?: string } = {}) {
  return (
    <div
      className={c(
        'LOGO flex w-full items-center default:text-2xl',
        props.className,
      )}
    >
      <Link passHref href="/">
        <a className="lovely-gradient w-fit cursor-pointer select-none bg-clip-text font-extrabold uppercase tracking-tight text-transparent">
          Hollowverse
        </a>
      </Link>
    </div>
  );
}

export function SearchButton() {
  return (
    <Link
      href={{
        pathname: '/~search',
        query: { local: true },
      }}
      passHref
    >
      <a className="TOGGLE-BUTTON flex self-center rounded-md border-2 border-white bg-gray-100 p-1.5 transition hover:bg-gray-200 focus:border-blue-300">
        <FaSearch aria-hidden className="text-xl" />
        <span className="sr-only">Search</span>
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
