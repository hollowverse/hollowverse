import Image from 'next/image';
import { RiQuillPenLine } from 'react-icons/ri';

export const Footer = () => {
  return (
    <footer aria-label="footer" className="mb-5 w-full">
      <div className="border-y bg-white">
        <div className="align-center h-container flex justify-center p-5">
          <Image
            width={50}
            height={50}
            alt="Hollowverse: Important people and their beliefs"
            src="/images/logo.svg"
          />
          <div className="flex-1" />
          <RiQuillPenLine className="self-center text-base" />
          <span className="align-center flex h-fit justify-center gap-1 self-center text-xs uppercase leading-loose text-neutral-400">
            This website is for sale for $25,000 USD.{' '}
            <a
              className="bold underline"
              href="mailto:msafi+hollowversesale@msafi.com"
              id="about-link"
            >
              Email me
            </a>
            , if interested.
          </span>
        </div>
      </div>
    </footer>
  );
};
