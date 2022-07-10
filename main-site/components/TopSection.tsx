import { isEmpty } from 'lodash-es';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { CelebImage } from '~/components/CelebImage';
import { TagCollection } from '~/components/TagCollection';
import { CelebWithTimeline } from '~/lib/getStatic/helpers/getCelebWithTimeline';
import { Link } from '~/lib/Link';

export const TopSection = (props: CelebWithTimeline) => {
  const picture = props.picture;
  const router = useRouter();

  return (
    <div className="TOP-SECTION h-container p-5">
      <div className="flex flex-wrap items-end gap-x-5">
        <div className="w-[150px]">
          {withLink(
            <CelebImage
              className="rounded-md object-cover"
              key={props.name + '-topSection-image'}
              picture={picture}
              name={props.name}
            />,
          )}
        </div>
        {withLink(
          <h1 className="mt-5">
            <span className="text-lg font-normal tracking-wide text-neutral-500">
              The Views of
            </span>{' '}
            <span
              id="main-name"
              className="mt-1 block text-4xl font-extrabold tracking-tight text-neutral-600"
            >
              {props.name}
            </span>
          </h1>,
        )}
      </div>

      {!isEmpty(props.tagTimeline) && (
        <div className="pt-5">
          <TagCollection celeb={props} />
        </div>
      )}
    </div>
  );

  function withLink(node: ReactNode) {
    const link = `/${props.slug}`;

    if (link == router.asPath) {
      return node;
    }

    return (
      <Link href={`/${props.slug}`} passHref>
        <a>{node}</a>
      </Link>
    );
  }
};
