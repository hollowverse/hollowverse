import { defaults } from 'lodash-es';
import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { LovelyTopBorder } from '~/lib/pages/components/LovelyTopBorder';

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
          <LovelyTopBorder />
          <div className="lg:border-0 lg:border-b border-b bg-white p-5 font-bold xs:border-x">
            {params.title}
          </div>
        </>
      )}

      <div
        className={clsx(' border-b bg-white xs:border-x', {
          'p-5': !params.disablePadding,
        })}
      >
        {params.children}
      </div>
    </div>
  );
}
