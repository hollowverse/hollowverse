import React from 'react';
import { useCelebContext } from '~/lib/pages/components/StaticPropsContextProvider';
import { Tag } from '~/lib/pages/Celeb/Tag';
import { FaPlusCircle, FaQuestionCircle } from 'react-icons/fa';

export const TagCollection = () => {
  const tags = useCelebContext().celeb.tags!;

  return (
    <div className="f-full">
      <div className="mx-auto flex flex-wrap justify-center gap-2.5">
        {tags.regular.map((t, val) => (
          <Tag key={val}>{t.tag.name}</Tag>
        ))}
        {tags.lowConfidence.map((t, val) => (
          <Tag key={val}>
            <FaQuestionCircle className="mr-1 flex self-center text-xs text-neutral-400" />
            {t.tag.name}
          </Tag>
        ))}
      </div>
    </div>
  );
};
