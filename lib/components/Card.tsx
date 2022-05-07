import { defaults } from 'lodash-es';
import React, { ReactNode } from 'react';
import clsx from 'clsx';

export function Card(_params: {
  title?: string;
  children: ReactNode;
  disablePadding?: boolean;
  className?: string;
}) {
  const params = defaults({}, _params, { disablePadding: false });

  return (
    <div className={clsx('mb-5', params.className)}>
      {params.title && (
        <>
          <div className="h-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400" />
          <div className="border-b bg-white p-5 font-bold lg:border-0 lg:border-x lg:border-b">
            {params.title}
          </div>
        </>
      )}

      <div
        className={clsx(' border-b bg-white lg:border-x', {
          'p-5': !params.disablePadding,
        })}
      >
        {params.children}
      </div>
    </div>
  );
}
