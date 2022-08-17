import { forwardRef } from 'react';
import { c } from '~/lib/c';
import { ReactElementProps } from '~/shared/lib/types';

export const Input = forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements['input']
>(function Input(props: ReactElementProps<'input'>, ref) {
  return (
    <input
      ref={ref}
      {...props}
      className={c(
        'block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-purple-600 focus:ring-purple-600 sm:max-w-xs sm:text-sm',
        props.className,
      )}
    />
  );
});
