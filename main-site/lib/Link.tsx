import NextLink, { LinkProps } from 'next/link';
import React from 'react';

export function Link(props: React.PropsWithChildren<LinkProps>) {
  return <NextLink {...props} prefetch={false} />;
}
