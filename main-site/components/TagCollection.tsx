import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { Tag } from '~/components/Tag';
import { c } from '~/lib/c';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';
import { FaRegCircle } from 'react-icons/fa';

export const TagCollection = (props: CelebPageProps) => {
  const tags = props.celeb.tags;
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

          <div
            className={c('flex flex-wrap gap-2.5 pt-3', {
              'border-l-2': i < tags.length - 1,
              'p-5': showTimeline,
            })}
          >
            {tpair[1].map((t, i2) => (
              <Tag key={`${i}-${i2}`}>
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
