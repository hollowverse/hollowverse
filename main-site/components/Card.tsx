import { defaults } from 'lodash-es';
import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';
import clsx from 'clsx';
import { LovelyTopBorder } from '~/components/LovelyTopBorder';
import { c } from '~/lib/c';

export function CardTitle(
  props: PropsWithChildren<{ component?: React.ElementType }>,
) {
  const Root = 'h2' || props.component;

  return (
    <Root
      className="flex gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-lg"
      {...props}
    />
  );
}

export function Card(_props: {
  title?: ReactNode;
  children: ReactNode;
  disablePadding?: boolean;
  className?: string;
  stickyTitle?: boolean;
  disableTitlePadding?: boolean;
}) {
  const props = defaults({}, _props, {
    disablePadding: false,
    stickyTitle: false,
    disableTitlePadding: false,
  });

  return (
    <div
      className={clsx('border-b bg-white default:lg:border-x', props.className)}
    >
      {props.title && (
        <div
          className={c({
            'sticky top-0 z-10 shadow-sm': props.stickyTitle,
          })}
        >
          <LovelyTopBorder />
          <div
            className={c(
              'border-b bg-white text-xl font-bold text-neutral-600',
              {
                'p-5': !props.disableTitlePadding,
              },
            )}
          >
            {props.title}
          </div>
        </div>
      )}

      <div>{props.children}</div>
    </div>
  );
}
