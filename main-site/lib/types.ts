export type Json = { [name: string]: any };

export type ReactElementProps<T extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[T];

export type Nullish<T> = T | null | undefined;

declare global {
  interface Window {
    DiscourseEmbed: {
      discourseUrl?: string;
      topicId?: string;
    };

    gtag: any;

    adsbygoogle: any;
  }
}
