import { c } from '~/lib/c/c';
import { ReactElementProps } from '~/shared/lib/types';

export type CardProps = { topBorder?: boolean };

export function Card(
  props: ReactElementProps<'div'> & { topBorder?: boolean },
) {
  const { topBorder, ...rest } = props;

  return (
    <div
      {...rest}
      className={c('border-b bg-white default:lg:border-x', rest.className, {
        'border-t': props.topBorder ?? true,
      })}
    />
  );
}
