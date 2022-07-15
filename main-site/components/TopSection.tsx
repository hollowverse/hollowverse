import { isEmpty } from 'lodash-es';
import { PropsWithChildren, ReactNode } from 'react';
import { CelebImage } from '~/components/CelebImage';
import { TagCollection } from '~/components/TagCollection';
import { TagTimeline } from '~/lib/getStatic/helpers/getTagTimeline';
import { Celeb } from '~/lib/groq/celeb.projection';

export function TsTitleContainer(props: PropsWithChildren<{}>) {
  return <h1 className="flex flex-col gap-1">{props.children}</h1>;
}

export function TsTitleSoftText(props: PropsWithChildren<{}>) {
  return (
    <span className="text-lg font-normal tracking-wide text-neutral-500">
      {props.children}
    </span>
  );
}

export function TsTitleStrongText(props: PropsWithChildren<{}>) {
  return (
    <span className="block text-4xl font-extrabold tracking-tight text-neutral-600">
      {props.children}
    </span>
  );
}

/*
 || (
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
        )

 */

export const TopSection = (props: {
  celeb: Celeb;
  tagTimeline: TagTimeline;
  title: ReactNode;
}) => {
  return (
    <div className="TOP-SECTION h-container p-5">
      <div className="flex flex-wrap items-end gap-5">
        <div className="w-[150px]">
          <CelebImage
            className="rounded-md object-cover"
            key={props.celeb.name + '-topSection-image'}
            picture={props.celeb.picture}
            name={props.celeb.name}
          />
        </div>
        {props.title}
      </div>

      {!isEmpty(props.tagTimeline) && (
        <div className="pt-5">
          <TagCollection celeb={props.celeb} tagTimeline={props.tagTimeline} />
        </div>
      )}
    </div>
  );
};
