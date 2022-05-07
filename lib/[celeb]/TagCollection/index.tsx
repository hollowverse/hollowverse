import React from 'react';
import { useCelebContext } from '~/lib/components/StaticPropsContextProvider';
import { Tag } from '~/lib/[celeb]/Tag';

export const TagCollection = () => {
  const tags = useCelebContext().celeb.tags!;

  return (
    <div className="f-full">
      <div className="mx-auto flex flex-wrap gap-2.5">
        {tags.regular.map((t, val) => (
          <Tag key={val}>{t.tag.name}</Tag>
        ))}
      </div>

      {tags.lowConfidence.length > 0 && (
        <div className="mt-2.5 flex items-center gap-1.5">
          <div className="text-xs tracking-wide text-neutral-400">Maybe:</div>

          <div className="flex flex-wrap gap-2.5">
            {tags.lowConfidence.map((t, val) => (
              <Tag key={val}>{t.tag.name}</Tag>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
