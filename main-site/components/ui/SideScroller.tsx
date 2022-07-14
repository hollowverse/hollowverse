import { PropsWithChildren } from 'react';

export function SideScroller(props: PropsWithChildren<{}>) {
  return (
    <div className="relative">
      <div className="no-scrollbar flex flex-row gap-1 overflow-auto pl-7">
        {props.children}
        <div className="FILLER min-w-[50px] flex-grow" />
      </div>
      <div className="LEFT-FADE pointer-events-none absolute top-0 left-0 bottom-0 z-10 w-7 bg-gradient-to-r from-gray-100 via-transparent to-transparent" />
      <div className="RIGHT-FADE pointer-events-none absolute top-0 right-0 bottom-0 z-10 -mr-3 w-36 bg-gradient-to-l from-gray-100 via-transparent to-transparent" />
    </div>
  );
}
