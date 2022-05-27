import { defaults } from 'lodash-es';
import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { LovelyTopBorder } from '~/components/LovelyTopBorder';

export function Card(_params: {
  title?: ReactNode;
  children: ReactNode;
  disablePadding?: boolean;
  className?: string;
}) {
  const params = defaults({}, _params, { disablePadding: false });

  return (
    <div className={clsx('border-b bg-white lg:border-x', params.className)}>
      {params.title && (
        <>
          <LovelyTopBorder />
          <div className="border-b p-5 text-xl font-bold">{params.title}</div>
        </>
      )}

      <div className={params.disablePadding ? '' : 'p-5'}>
        {params.children}
      </div>
    </div>
  );
}
