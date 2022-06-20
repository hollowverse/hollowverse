import { Link } from '~/lib/Link';
import React, { PropsWithChildren, ReactNode } from 'react';
import { FaSearch } from 'react-icons/fa';
import { LovelyTopBorder } from '~/components/LovelyTopBorder';
import { c } from '~/lib/c';
import { Card } from '~/components/Card';

export function Nav(props: { children: ReactNode; navClasses?: string }) {
  return (
    <nav
      role="navigation"
      aria-label="Main Navigation"
      className={c(
        'NAV h-container flex items-center justify-between py-3 px-5 default:flex-row default:gap-2',
        props.navClasses,
      )}
    >
      {props.children}
    </nav>
  );
}

export function Container(props: { children: ReactNode; navClasses?: string }) {
  return (
    <Card className="border-x-0">
      <LovelyTopBorder />
      <Nav {...props} />
    </Card>
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

export function StickyAppBar(props: PropsWithChildren<{}>) {
  return (
    <Card
      stickyTitle
      disablePadding
      disableTitlePadding
      className="border-x-0"
      title={
        <Nav>
          <Logo />
          <SearchButton />
        </Nav>
      }
    >
      {props.children}
    </Card>
  );
}
