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
    <div className={c('min-h-screen bg-gray-100', params.className)}>
      {params.appBar || <AppBar />}

      <main>{params.children}</main>

      {params.footer || <Footer />}
    </div>
  );
}
