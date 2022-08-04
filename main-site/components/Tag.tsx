import { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import { PurpleDot } from '~/components/ui/PurpleDot';
import { c } from '~/lib/c';

export function Tag(
  props: PropsWithChildren<{
    tagId: string;
    link: LinkProps['href'];
  }>,
) {
  const router = useRouter();
  const isSelected = router.query.tagId === props.tagId;

  return (
    <p
      id="tag"
      className={c(
        'pointer-events-auto m-0 box-border flex gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm text-neutral-700',
        {
          'unselected border shadow-sm': !isSelected,
          'selected -m-[1px] border-2 border-purple-300 shadow-inner':
            isSelected,
        },
      )}
    >
      <PurpleDot />
      {props.children}
    </p>
  );
}
