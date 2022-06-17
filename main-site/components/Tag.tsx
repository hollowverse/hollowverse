import React, { ReactNode } from 'react';

export function Tag(params: { children: ReactNode }) {
  return (
    <p className="m-0 flex gap-1 rounded-full border bg-gray-100 px-4 py-2 text-sm text-neutral-700 shadow-sm">
      {params.children}
    </p>
  );
}
