import React from 'react';
import { c } from '~/lib/pages/utils/c';

export function LovelyTopBorder(params: { className?: string }) {
  return (
    <div
      className={c('lovely-gradient w-full default:h-1', params.className)}
    />
  );
}
