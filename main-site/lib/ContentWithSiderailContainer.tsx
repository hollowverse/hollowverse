import React from 'react';
import AdUnit from '~/lib/AdUnit';
import { c } from '~/lib/c';

type Props = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function ContentWithSiderailContainer({
  children,
  className,
  containerClassName,
  ...props
}: Props) {
  return (
    <div
      className={c('mb-16 flex justify-center', containerClassName)}
      {...props}
    >
      <div className="ad-siderail sticky top-[148px] hidden min-w-[160px] justify-center overflow-hidden md:flex">
        <AdUnit deliveryId="pubg-syu-sbw" className="max-w-full" />
      </div>
      <div className={c('ml-4 mr-4 sm:min-w-[460px]', className)}>
        {children}
      </div>
      <div className="ad-siderail sticky top-[148px] hidden min-w-[160px] justify-center overflow-hidden md:flex">
        <AdUnit deliveryId="pubg-syu-sbw" className="max-w-full" />
      </div>
    </div>
  );
}

export default ContentWithSiderailContainer;
