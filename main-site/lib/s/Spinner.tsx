import { CgSpinner } from 'react-icons/cg';
import { c } from '~/lib/c/c';
import { ReactElementProps } from '~/shared/lib/types';

export function Spinner(props: ReactElementProps<'svg'>) {
  return (
    <CgSpinner
      {...props}
      className={c(
        'animate-spin text-purple-500 default:text-6xl',
        props.className,
      )}
    />
  );
}
