import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';
import { AppBar } from '~/lib/a/AppBar';
import { Footer } from '~/lib/f/Footer';
import { c } from '~/lib/c/c';

export function Page(props: {
  children: ReactNode;
  className?: string;
  appBar?: ReactElement;
  footer?: ReactElement;
  title: string;
  allowSearchEngines: boolean;
  description: string;
  id: string;
  pathname: string;
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

      <div
        id={props.id}
        style={{ contain: 'paint' }}
        className={c('flex min-h-screen flex-col bg-gray-100', props.className)}
      >
        {props.appBar || <AppBar />}

        <main className="flex flex-1 flex-col">{props.children}</main>

        {props.footer || <Footer />}
      </div>
    </>
  );
}
