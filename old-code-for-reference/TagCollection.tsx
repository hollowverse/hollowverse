import { FaQuestionCircle, FaRegCircle } from 'react-icons/fa';
import { Tag } from '~/lib/disabled/Tag';
import { TagTimeline } from '~/lib/disabled/getTagTimeline';

export const TagCollection = (props: {
  slug: string;
  tagTimeline: TagTimeline;
}) => {
  const tags = props.tagTimeline;

  return (
    <div className="flex flex-col gap-5 border-l-2">
      {tags.map((tpair, i) => (
        <div key={tpair[0]} className="flex">
          <div className="pt-2">
            <FaRegCircle className="-ml-[11px] bg-white text-xl text-gray-300" />
          </div>

          <div className="ml-3 flex flex-wrap gap-2">
            <p className="flex items-center gap-3 text-lg tracking-wider text-neutral-500">
              {tpair[0]}
            </p>

            {tpair[1].map((t) => (
              <Tag key={t.tag._id} tagId={t.tag._id}>
                {t.tag.name}
                {t.isBackground && ' Background'}
                {t.isLowConfidence && (
                  <FaQuestionCircle className="self-center text-xs text-neutral-400" />
                )}
              </Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
