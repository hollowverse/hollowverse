import React from 'react';
import NextLink, { LinkProps } from 'next/link';

export function Link(props: React.PropsWithChildren<LinkProps>) {
  return <NextLink prefetch={false} {...props} />;
}