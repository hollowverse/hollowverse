import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { RiQuillPenLine } from 'react-icons/ri';

export const Footer = () => {
  const [hover, setHover] = useState(false);

  const setHoverFalse = () => setHover(false);
  const setHoverTrue = () => setHover(true);

  return (
    <footer aria-label="footer" className="mt-5 w-full">
      <div className="border-y bg-white px-5">
        <div className="align-center mx-auto flex w-full max-w-3xl justify-center py-5">
          <Image
            width={50}
            height={50}
            alt="Hollowverse: Important people and their beliefs"
            src="/images/logo.svg"
          />

          <div className="flex-1" />

          <Link href="/~about" passHref>
            <a className="align-center flex h-fit justify-center gap-1 self-center text-xs uppercase leading-loose text-neutral-400">
              <RiQuillPenLine className="self-center text-base" />
              About Hollowverse
            </a>
          </Link>
        </div>
      </div>

      <div className="flex w-full justify-center px-5">
        <div className="flex w-full max-w-3xl justify-start text-neutral-400">
          <a
            href="https://rlogank.com/"
            rel="noreferrer"
            target="_blank"
            className="my-5 flex items-center gap-1 text-xs font-light tracking-wider transition duration-300 hover:text-neutral-700"
            onFocus={setHoverTrue}
            onMouseOver={setHoverTrue}
            onMouseOut={setHoverFalse}
            onBlur={setHoverFalse}
          >
            Designed with
            <FaHeart
              className={
                hover
                  ? 'text-rose-500 transition duration-300'
                  : 'transition duration-300'
              }
            />
            by Logan
          </a>
        </div>
      </div>
    </footer>
  );
};
