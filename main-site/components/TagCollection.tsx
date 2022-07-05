import { FaQuestionCircle, FaRegCircle } from 'react-icons/fa';
import { Tag } from '~/components/Tag';
import { c } from '~/lib/c';
import { CelebWithTimeline } from '~/lib/getStatic/helpers/getCelebWithTimeline';
import { Tag as TTag } from '~/lib/groq/tag.projection';
import { ReactElementProps } from '~/lib/types';

export function Tags(
  props: ReactElementProps<'div'> & { tags: TTag[]; slug: string },
) {
  return (
    <div
      {...props}
      className={c('flex flex-wrap gap-2.5 pt-3', props.className)}
    >
      {props.tags.map((t) => (
        <Tag key={t.tag._id} slug={props.slug} tagId={t.tag._id}>
          {t.tag.name}
          {t.isBackground && ' Background'}
          {t.isLowConfidence && (
            <FaQuestionCircle className="self-center text-xs text-neutral-400" />
          )}
        </Tag>
      ))}
    </div>
  );
}

export const TagCollection = (props: { celeb: CelebWithTimeline }) => {
  const tags = props.celeb.tagTimeline;
  const showTimeline = tags.length > 1;

  return (
    <div className="flex flex-col">
      {tags.map((tpair, i) => (
        <div key={tpair[0]}>
          {showTimeline && (
            <p className="-ml-2 flex items-center gap-3 text-lg tracking-wider text-neutral-500">
              <FaRegCircle className="text-gray-300" />
              {tpair[0]}
            </p>
          )}

          <Tags
            tags={tpair[1]}
            slug={props.celeb.slug}
            className={c({
              'border-l-2': i < tags.length - 1,
              'p-5': showTimeline,
            })}
          />
        </div>
      ))}
    </div>
  );
};
