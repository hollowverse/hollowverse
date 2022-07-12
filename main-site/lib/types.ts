import { UnwrapPromise } from 'next/dist/lib/coalesced-function';

export type Json = { [name: string]: any };

export type ReactElementProps<T extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[T];

export type Nullish<T> = T | null | undefined;

export type PageProps<T extends (...args: any) => any> = NonNullable<
  UnwrapPromise<ReturnType<T>>['props']
>;

declare global {
  interface Window {
    DiscourseEmbed: {
      discourseUrl?: string;
      topicId?: string;
    };

    gtag: any;

    adsbygoogle: any;

    FB: any;
  }
}
