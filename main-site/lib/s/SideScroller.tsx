import { PropsWithChildren } from 'react';
import { c } from '~/lib/c/c';
import { ReactElementProps } from '~/shared/lib/types';

export function SideScroller(props: ReactElementProps<'div'>) {
  return (
    <div className="relative z-0">
      <div
        className={c(
          'no-scrollbar flex flex-row gap-1 overflow-auto border bg-white',
          props.className,
        )}
      >
        {props.children}
        <div className="FILLER min-w-[50px] flex-grow" />
      </div>
      <div className="LEFT-FADE pointer-events-none absolute top-0 left-0 bottom-0 z-10 w-3 bg-gradient-to-r from-gray-200 via-transparent to-transparent" />
      <div className="RIGHT-FAD pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-3 bg-gradient-to-l from-gray-200 via-transparent to-transparent" />
    </div>
  );
}
