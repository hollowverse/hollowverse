import { isEmpty } from 'lodash-es';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { CelebImage } from '~/components/CelebImage';
import { TagCollection } from '~/components/TagCollection';
import { TagTimeline } from '~/lib/getStatic/helpers/getTagTimeline';
import { Celeb } from '~/lib/groq/celeb.projection';
import { Link } from '~/lib/Link';

export const TopSection = (props: {
  celeb: Celeb;
  tagTimeline: TagTimeline;
  title?: ReactNode;
}) => {
  const picture = props.celeb.picture;
  const router = useRouter();

  return (
    <div className="TOP-SECTION h-container p-5">
      <div className="flex flex-wrap items-end gap-5">
        <div className="w-[150px]">
          <CelebImage
            className="rounded-md object-cover"
            key={props.celeb.name + '-topSection-image'}
            picture={picture}
            name={props.celeb.name}
          />
        </div>
        {props.title || (
          <h1>
            <span className="text-lg font-normal tracking-wide text-neutral-500">
              The Political Views of
            </span>{' '}
            <span
              id="main-name"
              className="mt-1 block text-4xl font-extrabold tracking-tight text-neutral-600"
            >
              {props.celeb.name}
            </span>
          </h1>
        )}
      </div>

      {!isEmpty(props.tagTimeline) && (
        <div className="pt-5">
          <TagCollection celeb={props.celeb} tagTimeline={props.tagTimeline} />
        </div>
      )}
    </div>
  );
};
