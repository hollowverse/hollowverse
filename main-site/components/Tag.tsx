import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import { c } from '~/lib/c';
import { Link } from '~/lib/Link';

export function Tag(
  props: PropsWithChildren<{
    tagId: string;
    link: string;
  }>,
) {
  const router = useRouter();
  const isSelected = router.query.celebTagId === props.tagId;

  return (
    <Link href={props.link} passHref>
      <a
        id="tag"
        className={c(
          'pointer-events-auto m-0 box-border flex gap-1 rounded-full bg-gray-100 px-4 py-2 text-sm text-neutral-700',
          {
            'unselected border shadow-sm': !isSelected,
            'selected -m-[1px] border-2 border-purple-300 shadow-inner':
              isSelected,
          },
        )}
      >
        {props.children}
      </a>
    </Link>
  );
}
