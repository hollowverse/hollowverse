import { PropsWithChildren } from 'react';

export function SideScroller(props: PropsWithChildren<{}>) {
  return (
    <div className="h-side-inner-shadows relative border-l border-r border-gray-100">
      <div className="no-scrollbar flex flex-row gap-1 overflow-auto pl-7">
        {props.children}
        <div className="FILLER min-w-[50px] flex-grow" />
      </div>
    </div>
  );
}
