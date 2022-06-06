import { defaults } from 'lodash-es';
import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { LovelyTopBorder } from '~/components/LovelyTopBorder';
import { c } from '~/lib/c';

export function Card(_props: {
  title?: ReactNode;
  children: ReactNode;
  disablePadding?: boolean;
  className?: string;
  stickyTitle?: boolean;
}) {
  const props = defaults({}, _props, {
    disablePadding: false,
    stickyTitle: false,
  });

  return (
    <div className={clsx('border-b bg-white lg:border-x', props.className)}>
      {props.title && (
        <div
          className={c({
            'sticky top-0 z-10 shadow-sm': props.stickyTitle,
          })}
        >
          <LovelyTopBorder />
          <div className="border-b bg-white p-5 text-xl font-bold">
            {props.title}
          </div>
        </div>
      )}

      <div className={props.disablePadding ? '' : 'p-5'}>{props.children}</div>
    </div>
  );
}
