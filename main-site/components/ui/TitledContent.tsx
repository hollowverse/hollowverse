import { PropsWithChildren, ReactNode } from 'react';
import { LovelyTopBorder } from '~/components/LovelyTopBorder';
import { c } from '~/lib/c';

export type TitledContentProps =
  | {
      title: ReactNode;
    } & ({ stickyTitle?: boolean } | { bottomStickyTitle: boolean });

export function TitledContent(props: PropsWithChildren<TitledContentProps>) {
  const stickyTitle = 'stickyTitle' in props ? props.stickyTitle : false;
  const bottomStickyTitle =
    'bottomStickyTitle' in props ? props.bottomStickyTitle : false;
  const isSticked = stickyTitle || bottomStickyTitle;

  return (
    <div className="relative z-0">
      {bottomStickyTitle && props.children}

      <div
        className={c({
          'sticky z-10 shadow-sm': isSticked,
          'top-0': stickyTitle,
          'bottom-0': bottomStickyTitle,
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

      {(stickyTitle || !isSticked) && props.children}
    </div>
  );
}
