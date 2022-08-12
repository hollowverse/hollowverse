import { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import { PurpleDot } from '~/lib/PurpleDot';
import { c } from '~/lib/c';
import { Link } from '~/lib/Link';

export function Tag(
  props: PropsWithChildren<{
    tagId: string;
    link?: LinkProps['href'];
  }>,
) {
  const router = useRouter();
  const isSelected = router.query.tagId === props.tagId;
  const Root = props.link ? 'a' : 'p';
  const content = (
    <Root
      id="tag"
      className={c(
        'pointer-events-auto m-0 box-border flex gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm text-neutral-700',
        {
          'shadow-sm': !isSelected && props.link,
          'unselected border': !isSelected,
          'selected -m-[1px] border-2 border-purple-300 shadow-inner':
            isSelected,
        },
      )}
    >
      <PurpleDot />
      {props.children}
    </Root>
  );

  if (props.link) {
    return (
      <Link href={props.link} passHref>
        {content}
      </Link>
    );
  }

  return content;
}
