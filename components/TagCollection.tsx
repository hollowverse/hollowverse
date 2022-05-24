import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { Tag } from '~/components/Tag';
import { useCelebContext } from '~/components/StaticPropsContextProvider';

export const TagCollection = () => {
  const tags = useCelebContext().celeb.tags!;

  return (
    <div className="mx-auto flex flex-wrap justify-center gap-2.5">
      {tags.map((t, val) => (
        <Tag key={val}>
          {t.tag.name}
          {t.isLowConfidence && (
            <FaQuestionCircle className="self-center text-xs text-neutral-400" />
          )}
        </Tag>
      ))}
    </div>
  );
};
