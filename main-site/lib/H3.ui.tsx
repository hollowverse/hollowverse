import { c } from '~/lib/c';
import { ReactElementProps } from '~/shared/lib/types';

export function H3(props: ReactElementProps<'h3'>) {
  return (
    // eslint-disable-next-line jsx-a11y/heading-has-content
    <h3
      {...props}
      className={c(
        'text-lg font-medium leading-6 text-gray-900',
        props.className,
      )}
    />
  );
}
