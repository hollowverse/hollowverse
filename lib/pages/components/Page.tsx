import React, { ReactElement, ReactNode } from 'react';
import { c } from '~/lib/pages/utils/c';
import { AppBar } from '~/lib/pages/components/AppBar';
import { Footer } from '~/lib/pages/_app/Footer';

export function Page(params: {
  children: ReactNode;
  className?: string;
  appBar?: ReactElement;
  footer?: ReactElement;
}) {
  return (
    <div
      className={c(
        'flex min-h-screen min-w-[320px] flex-col overflow-scroll bg-gray-100',
        params.className,
      )}
    >
      {params.appBar || <AppBar />}

      <main className="flex flex-1 flex-col">{params.children}</main>

      {params.footer || <Footer />}
    </div>
  );
}
