import Head from 'next/head';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import AdUnit from '~/lib/AdUnit';
import { AppBar } from '~/lib/AppBar';
import { Footer } from '~/lib/Footer';
import { c } from '~/lib/c';

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
  const [isAdWaitExpired, setIsAdWaitExpired] = useState(true);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setIsAdWaitExpired(true);
  //   }, 1000 * 7);

  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // });

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

        <meta property="fb:app_id" content="305338489525900" />

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
        {/* <div
          style={{ display: 'none' }}
          className={c(
            'sticky top-0 z-50 hidden shadow transition-all md:block',
            isAdWaitExpired && 'sticky top-0 md:static',
          )}
        >
          <div className="flex h-[90px] w-full items-center justify-center bg-white md:h-[250px]">
            <AdUnit deliveryId="pubg-97p-vf9" />
          </div>
        </div> */}

        {/* <div className={c('sticky top-0 z-50 shadow transition-all md:hidden')}>
          <div className="flex h-[50px] w-full items-center justify-center bg-white md:h-[250px]">
            <AdUnit deliveryId="pubg-yqn-4hl" />
          </div>
        </div> */}

        <div
          className={c(
            'sticky z-50 shadow',
            // 'top-[50px]',
            'top-0',
            isAdWaitExpired ? 'md:top-0' : 'md:top-[250px]',
          )}
        >
          {props.appBar || <AppBar />}
        </div>

        <main className="flex flex-1 flex-col">{props.children}</main>

        {props.footer || <Footer />}
      </div>
    </>
  );
}
