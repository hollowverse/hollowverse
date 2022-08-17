import { forwardRef } from 'react';
import { c } from '~/lib/c';
import { ReactElementProps } from '~/shared/lib/types';

export const Input = forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements['input'] & { error?: boolean }
>(function Input(props, ref) {
  const { error, ...rest } = props;
  return (
    <input
      ref={ref}
      {...rest}
      className={c(
        {
          'border-red-600 ring-red-600': error,
          'border-gray-300': !error,
        },
        'block w-full max-w-lg rounded-md shadow-sm focus:border-purple-600 focus:ring-purple-600 sm:max-w-xs sm:text-sm',
        props.className,
      )}
    />
  );
});
