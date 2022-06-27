import { PropsWithChildren, ReactNode } from 'react';
import { FaSearch } from 'react-icons/fa';
import { LovelyTopBorder } from '~/components/LovelyTopBorder';
import { Card } from '~/components/ui/Card';
import { TitledContent } from '~/components/ui/TitledContent';
import { c } from '~/lib/c';
import { Link } from '~/lib/Link';

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
    <Card topBorder={false}>
      <LovelyTopBorder />
      <Nav {...props} />
    </Card>
  );
}

export function Logo(props: { className?: string } = {}) {
  return (
    <div
      className={c(
        'flex w-full items-center default:text-2xl',
        props.className,
      )}
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
    <Link
      href={{
        pathname: '/~search',
        query: { local: true },
      }}
      passHref
    >
      <a
        id="search-icon"
        className="TOGGLE-BUTTON flex self-center rounded-md border-2 border-white bg-gray-100 p-1.5 transition hover:bg-gray-200 focus:border-blue-300"
      >
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
