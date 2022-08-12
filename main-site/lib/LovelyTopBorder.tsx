import { c } from '~/lib/c';

export function LovelyTopBorder(params: { className?: string }) {
  return (
    <div
      className={c('lovely-gradient w-full default:h-1', params.className)}
    />
  );
}
