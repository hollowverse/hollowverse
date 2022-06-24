export type Json = { [name: string]: any };

export type ReactElementProps<T extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[T];
