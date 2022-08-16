import { PropsWithChildren, ReactNode } from 'react';
import { LovelyTopBorder } from '~/lib/LovelyTopBorder';
import { c } from '~/lib/c';

export type TitledContentProps =
  | {
      title: ReactNode;
    } & ({ stickyTitle?: boolean } | { bottomStickyTitle: boolean });

export function TitledContent(props: PropsWithChildren<TitledContentProps>) {
  const stickyTitle = 'stickyTitle' in props ? props.stickyTitle : false;

  return (
    <div className="relative z-0">
      <div
        className={c({
          'sticky z-10 shadow-sm': stickyTitle,
          'top-0': stickyTitle,
        })}
      >
        <LovelyTopBorder />
        <div
          className={c(
            'border-b bg-white text-xl font-bold text-neutral-600 lg:border-x',
          )}
        >
          {props.title}
        </div>
      </div>

      {props.children}
    </div>
  );
}
