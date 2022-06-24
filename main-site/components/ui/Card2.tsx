import React, { PropsWithChildren } from 'react';
import { c } from '~/lib/c';

export type CardProps = { topBorder?: boolean };

export function Card2(props: PropsWithChildren<{ topBorder?: boolean }>) {
  return (
    <div
      className={c('border-b bg-white default:lg:border-x', {
        'border-t': props.topBorder === undefined && true,
      })}
    >
      {props.children}
    </div>
  );
}
