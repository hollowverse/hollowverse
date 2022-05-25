import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { RiQuillPenLine } from 'react-icons/ri';

export const Footer = () => {
  return (
    <footer aria-label="footer" className="my-5 w-full">
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
    </footer>
  );
};
