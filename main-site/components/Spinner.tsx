import { CgSpinner } from 'react-icons/cg';
import { c } from '~/lib/c';
import { ReactElementProps } from '~/lib/types';

export function Spinner(props: ReactElementProps<'svg'>) {
  return (
    <CgSpinner
      {...props}
      className={c(
        'animate-spin text-purple-400 default:text-6xl',
        props.className,
      )}
    />
  );
}
