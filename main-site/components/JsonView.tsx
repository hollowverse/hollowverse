import React from 'react';
import dynamic from 'next/dynamic';
import { Json } from '~/lib/types';

const ReactJson = dynamic(() => import('react-json-view'), {
  ssr: false,
});

// Used to render JSON data in React during
// development
export function JsonView(props: { src: Json; collapsed?: number }) {
  return (
    <ReactJson collapsed={props.collapsed || 2} src={props.src} name={false} />
  );
}
