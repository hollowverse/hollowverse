import { PropsWithChildren, ReactNode } from 'react';
import { FaComment, FaSearch } from 'react-icons/fa';
import { Link } from '~/lib/l/Link';
import { LovelyTopBorder } from '~/lib/l/LovelyTopBorder';
import { Card } from '~/lib/c/Card';
import { TitledContent } from '~/lib/t/TitledContent';
import { c } from '~/lib/c/c';

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
    <Card topBorder={false} className="font-normal">
      <LovelyTopBorder />
      <Nav {...props} />
    </Card>
  );
}

export function Logo(props: { className?: string } = {}) {
  return (
    <div
      className={c('flex w-full items-center default:text-xl', props.className)}
    >
      <Link passHref href="/">
        <a
          id="logo"
          className="lovely-gradient w-fit cursor-pointer select-none bg-clip-text font-extrabold uppercase tracking-tight text-transparent"
        >
          Hollowverse
        </a>
      </Link>
    </div>
  );
}

export function SearchButton() {
  return (
    <div className="flex text-sm uppercase text-neutral-500">
      <a
        href="https://forum.hollowverse.com"
        className="flex items-center gap-1 p-1.5 font-normal"
      >
        <FaComment className="text-sm font-normal" />
        Forum
      </a>

      <Link
        href={{
          pathname: '/~search',
          query: { local: true },
        }}
        passHref
      >
        <a
          id="search-link"
          className="flex items-center gap-1 p-1.5 font-normal"
        >
          <FaSearch className="text-sm font-normal" />
          Search
        </a>
      </Link>
    </div>
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
    <TitledContent
      stickyTitle
      title={
        <Nav>
          <Logo />
          <SearchButton />
        </Nav>
      }
    >
      <Card topBorder={false}>{props.children}</Card>
    </TitledContent>
  );
}
