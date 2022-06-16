import React, { ReactElement, ReactNode } from 'react';
import { c } from '~/lib/c';
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
        <title>{params.title} - Hollowverse</title>

        {!params.allowSearchEngines && (
          <meta key="head-robots" name="robots" content="noindex" />
        )}

        <meta
          key="head-viewport"
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
        <meta key="head-charset" charSet="utf-8" />

        <meta
          key="head-description"
          name="description"
          content={params.description}
        />

        <link
          key="head-canonical"
          rel="canonical"
          href={`https://hollowverse.com/${params.pathname}`}
        />

        <link
          key="head-favicon"
          rel="shortcut icon"
          href="/images/logo-no-border.svg"
        />
      </Head>

      <div
        className={c(
          'flex min-h-screen flex-col bg-gray-100',
          params.className,
        )}
      >
        {params.appBar || <AppBar />}

        <main className="flex flex-1 flex-col">{params.children}</main>

        {params.footer || <Footer />}
      </div>
    </>
  );
}
