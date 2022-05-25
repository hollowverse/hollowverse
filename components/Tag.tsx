import React, { ReactNode } from 'react';

export function Tag(params: { children: ReactNode }) {
  return (
    <p className="m-0 flex gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-neutral-700">
      {params.children}
    </p>
  );
}
