import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaEnvelope, FaHeart, FaInfoCircle } from 'react-icons/fa';

export const Footer = () => {
  const [hover, setHover] = useState(false);

  const setHoverFalse = () => setHover(false);
  const setHoverTrue = () => setHover(true);

  return (
    <footer aria-label="footer" className="w-full">
      <div className="border-y bg-white px-5">
        <div className="mx-auto w-full max-w-4xl py-5">
          <div className="mb-5">
            <Image
              width={50}
              height={50}
              alt="Hollowverse: Important people and their beliefs"
              src="/images/icons/letter-logo.png"
            />
          </div>

          <div className="flex flex-col gap-5">
            <div className="space-y-1">
              <div className="flex items-baseline gap-1.5">
                <FaInfoCircle className="text-xs" />
                <p>About</p>
              </div>

              <p>
                Hollowverse is about the important people and their beliefs.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-1.5">
                <FaEnvelope className="text-xs" />

                <p>Email us</p>
              </div>

              <p className="">
                You can contact us at{' '}
                <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
                  <Link href="mailto:hollowverse@hollowverse.com">
                    hollowverse@hollowverse.com
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center px-5">
        <div className="flex w-full max-w-4xl justify-start text-neutral-500">
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
