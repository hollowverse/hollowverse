import { c } from '~/lib/c';
import { ReactElementProps } from '~/shared/lib/types';

export function Input(props: ReactElementProps<'input'>) {
  return (
    <input
      {...props}
      className={c(
        'block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-purple-600 focus:ring-purple-600 sm:max-w-xs sm:text-sm',
        props.className,
      )}
    />
  );
}
