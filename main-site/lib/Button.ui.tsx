import { c } from '~/lib/c';
import { ReactElementProps } from '~/shared/lib/types';

export function Button(props: ReactElementProps<'button'>) {
  return (
    <button
      {...props}
      className={c(
        'ml-3 inline-flex justify-center rounded-md border border-transparent bg-purple-600 py-2 px-10 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
        props.className,
      )}
    />
  );
}
