import { defaults } from 'lodash-es';
import { PropsWithChildren, ReactNode } from 'react';
import { LovelyTopBorder } from '~/components/LovelyTopBorder';
import { c } from '~/lib/c';

export type TitledContentProps = {
  title: ReactNode;
  stickyTitle?: boolean;
};

export function TitledContent(_props: PropsWithChildren<TitledContentProps>) {
  const props = defaults({}, _props, {
    stickyTitle: false,
  });

  return (
    <div className="relative z-0">
      <div
        className={c({
          'sticky top-0 z-10 shadow-sm': props.stickyTitle,
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
