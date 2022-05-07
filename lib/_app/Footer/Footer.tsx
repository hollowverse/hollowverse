import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaEnvelope, FaHeart, FaInfoCircle } from 'react-icons/fa';

export const Footer = () => {
  const [hover, setHover] = useState(false);

  return (
    <footer aria-label="footer" role="Footer" className="w-full border-t">
      <div className="mx-auto w-full max-w-5xl border-b px-5 lg:p-0">
        <div className="py-5">
          <div className="mb-5">
            <Image
              width={50}
              height={50}
              alt="Hollowverse: Import people and their beliefs"
              src="/images/icons/letter-logo.png"
            />
          </div>

          <div className="flex flex-col gap-5">
            <div className="space-y-1">
              <div className="flex items-baseline gap-1.5">
                <div>
                  <FaInfoCircle className="text-xs" />
                </div>
                <div>About</div>
              </div>
              <div>
                Hollowverse is about the important people and their beliefs.
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-1.5">
                <div>
                  <FaEnvelope className="text-xs" />
                </div>
                <div>Email us</div>
              </div>
              <div className="flex gap-1">
                You can contact us at{' '}
                <div className="flex bg-gradient-to-r from-emerald-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
                  <Link href="mailto:hollowverse@hollowverse.com">
                    hollowverse@hollowverse.com
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center bg-gray-50 px-5">
        <div className="flex w-full max-w-5xl justify-start text-neutral-500">
          <a
            href="https://rlogank.com/"
            rel="noreferrer"
            target="_blank"
            className="my-5 flex items-center gap-1 text-xs font-light tracking-wider transition duration-300 hover:text-neutral-700"
            onMouseOver={() => {
              setHover(true);
            }}
            onMouseOut={() => {
              setHover(false);
            }}
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
