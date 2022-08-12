import { FaChevronDown } from 'react-icons/fa';
import { c } from '~/lib/c';
import { Link } from '~/components/l/Link';

export function ReturnToCelebViewsButton(props: {
  slug: string;
  name: string;
}) {
  return (
    <Link href={`/${props.slug}`} passHref>
      <a
        title={`${props.name}'s political views`}
        id="return-to-celeb-views-button"
        className={c(
          `ml-5 flex w-fit items-center gap-1.5 rounded-lg bg-gray-200 px-3 py-2.5 text-neutral-600 shadow-sm transition focus:border-purple-300 active:bg-opacity-10`,
        )}
      >
        <FaChevronDown className={'rotate-90 text-xl text-purple-500'} />
        {props.name}&apos;s main page
      </a>
    </Link>
  );
}
