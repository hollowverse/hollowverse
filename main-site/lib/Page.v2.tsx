import Head from 'next/head';
import React from 'react';
import { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { c } from '~/lib/c';

export function Page(props: {
  className?: string;
  appBar?: ReactElement;
  footer?: ReactElement;
  title: string;
  allowSearchEngines: boolean;
  description: string;
  id: string;
  pathname: string;
  children: ReactNode;
}) {
  return (
    <>
      <Head>
        <title>{props.title} - Hollowverse</title>

        {!props.allowSearchEngines && (
          <meta key="head-robots" name="robots" content="noindex" />
        )}

        <meta
          key="head-viewport"
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
        <meta key="head-charset" charSet="utf-8" />

        <meta property="fb:app_id" content="528201628925813" />

        <meta
          key="head-description"
          name="description"
          content={props.description}
        />

        <link
          key="head-canonical"
          rel="canonical"
          href={`https://hollowverse.com${props.pathname}`}
        />

        <link
          key="head-favicon"
          rel="shortcut icon"
          href="/images/logo-no-border.svg"
        />
      </Head>

      <div className="min-h-full">{props.children}</div>
    </>
  );
}

function Container(props: PropsWithChildren<{}>) {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
        {props.children}
      </div>
    </div>
  );
}

Page.Container = Container;

function Main(props: PropsWithChildren<{ withAside?: boolean }>) {
  const withAside = props.withAside ?? false;
  return (
    <main className={c(withAside ? 'col-span-8' : 'col-span-12')}>
      {props.children}
    </main>
  );
}

function Aside(props: PropsWithChildren<{}>) {
  return (
    <aside className="hidden lg:col-span-4 lg:block">
      <div className="sticky top-4 space-y-4">{props.children}</div>
    </aside>
  );
}

Container.Main = Main;
Container.Aside = Aside;
