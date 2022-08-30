import { c } from '~/lib/c';
import { ReactElementProps } from '~/shared/lib/types';

export function Button(props: ReactElementProps<'button'>) {
  return (
    <button
      {...props}
      className={c(
        'inline-flex justify-center rounded-md border border-transparent bg-purple-600 py-2 px-10 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 default:hover:bg-purple-700',
        { 'opacity-30 hover:bg-purple-600': props.disabled },
        props.className,
      )}
    />
  );
}
