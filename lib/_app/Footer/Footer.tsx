import Image from 'next/image';
import React from 'react';

export const Footer = () => {
  return (
    <footer className="text-lg-2 text-center font-primary bg-white pt-28 pb-10 flex flex-col items-center justify-center w-full h-auto">
      <Image
        width={50}
        height={50}
        alt="Hollowverse"
        src="/images/icons/letter-logo.png"
      />

      <p className="text-base mt-4">
        Hollowverse is about the important <br />
        people and their beliefs.
      </p>

      <p className="mt-10 text-sm">
        Email us at{' '}
        <a
          href="mailto:hollowverse@hollowverse.com"
          className="text-black font-medium"
        >
          hollowverse@hollowverse.com
        </a>
        .
      </p>
    </footer>
  );
};
