import React, { ReactNode } from 'react';

export function BeforeResultsContainer(params: { children: ReactNode }) {
  return (
    <p className="flex flex-1 items-center justify-center text-xl text-neutral-400">
      {params.children}
    </p>
  );
}
