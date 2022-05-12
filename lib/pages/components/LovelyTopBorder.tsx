import React from 'react';
import { c } from '~/lib/pages/utils/c';

export function LovelyTopBorder(params: { className?: string }) {
  return (
    <div
      className={c(
        'w-full bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 default:h-1',
        params.className,
      )}
    />
  );
}
