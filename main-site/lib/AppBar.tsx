import { ReactNode, useState } from 'react';
import { FaBars, FaSearch, FaTimes } from 'react-icons/fa';
import { c } from '~/lib/c';
import { Card } from '~/lib/Card.ui';
import { Link } from '~/lib/Link';
import { LovelyTopBorder } from '~/lib/LovelyTopBorder';
import { useLocationHref } from '~/lib/useLocationHref';
import { useUser } from '~/lib/useUser';

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

export function AppBar() {
  const [open, setOpen] = useState(false);
  const href = useLocationHref();
  const user = useUser();

  return (
    <Card topBorder={false} className="font-normal">
      <LovelyTopBorder />

      <nav
        role="navigation"
        aria-label="Main Navigation"
        className="h-container flex flex-col gap-3 py-3 px-5"
      >
        <div className="flex items-center justify-between default:flex-row default:gap-2">
          <Logo />

          <div className="flex gap-3">
            <Link
              href={{
                pathname: '/~search',
                query: { local: true },
              }}
              passHref
            >
              <a
                id="search-link"
                className="flex items-center gap-1 p-1.5 font-normal text-neutral-400"
              >
                <FaSearch className="h-6 w-6" />
                <span className="hidden text-base uppercase md:block">
                  Search
                </span>
              </a>
            </Link>

            <button
              className="flex items-center gap-1 p-1.5 font-normal text-neutral-400"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
              <span className="hidden text-base font-normal uppercase text-neutral-400 md:block">
                Menu
              </span>
            </button>
          </div>
        </div>

        {open && (
          <div className="flex flex-col items-end gap-3 border-t py-5">
            <a
              href="https://forum.hollowverse.com"
              className="h-link underline"
            >
              Forum
            </a>

            {(user && (
              <a href="/~logout" className="h-link underline">
                Sign-out
              </a>
            )) || (
              <a
                className="h-link underline"
                href={`/api/login?redirect=${encodeURI(href)}`}
              >
                Sign-in
              </a>
            )}
          </div>
        )}
      </nav>
    </Card>
  );
}
