import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { FaEnvelope, FaInfoCircle } from 'react-icons/fa';

const footerInfo = [
  {
    title: 'About',
    icon: <FaInfoCircle className="text-xs" />,
    body: 'Hollowverse is about the important people and their beliefs.',
  },
];

export const Footer = () => {
  return (
    <footer aria-label="footer" role="Footer" className="w-full border-t">
      <div className="mx-auto w-full max-w-5xl px-5 lg:p-0">
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
            {footerInfo.map((x) => {
              return (
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1.5">
                    <div>{x.icon}</div>
                    <div>{x.title}</div>
                  </div>
                  <div>{x.body}</div>
                </div>
              );
            })}
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
    </footer>
  );
};
