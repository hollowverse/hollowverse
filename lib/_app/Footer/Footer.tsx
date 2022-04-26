import Image from 'next/image';
import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full bg-white h-auto">

      <section >
        <div className="pt-28 pb-10 flex flex-col items-center justify-center w-full h-auto">
          <Image
            width={50}
            height={50}
            alt="Hollowverse"
            src="/images/icons/letter-logo.png"
          />

          <p className="font-primary text-lg-2 text-base mt-4 text-center">
           Hollowverse is about the important <br />people and their beliefs.
          </p>

          <div className="mt-6">
            <p className="font-primary text-lg-2 text-sm mt-4 text-center">
              Email us at <a href="mailto:hollowverse@hollowverse.com" className="text-black font-medium">hollowverse@hollowverse.com</a>.
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
};
