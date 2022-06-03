import React, { ReactElement, ReactNode } from 'react';
import { AppBar } from '~/components/AppBar';
import { Footer } from '~/components/Footer';
import Head from 'next/head';

export function Page(params: {
  children: ReactNode;
  className?: string;
  appBar?: ReactElement;
  footer?: ReactElement;
  title: string;
  allowSearchEngines: boolean;
  description: string;
  /**
   * Should not have a leading slash
   */
  pathname: string;
}) {
  return (
    <>
      <Head>
        <title>{params.title} | Hollowverse</title>
      </Head>

      <div>
        <main className="flex flex-1 flex-col">{params.children}</main>
      </div>
    </>
  );
}
