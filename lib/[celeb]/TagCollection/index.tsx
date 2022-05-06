import React from 'react';
import { useCelebContext } from '~/lib/components/StaticPropsContextProvider';

export const TagCollection = () => {
  const tags = useCelebContext().celeb.tags!;

  //logan's comment, celeb tags

  return (
    <div className="f-full">
      <div className="mx-auto flex flex-wrap gap-2.5">
        {tags.regular.map((t, val) => (
          <div
            key={val}
            className="flex rounded-full bg-gray-100 px-2.5 pb-1 pt-1.5 text-sm"
          >
            {t.tag.name}
          </div>
        ))}
      </div>

      {tags.lowConfidence.length > 0 && (
        <div className="mt-2.5 flex items-center gap-1.5">
          <div className="text-xs tracking-wide text-neutral-400">Maybe:</div>

          <div className="flex flex-wrap gap-2.5">
            {tags.lowConfidence.map((t, val) => (
              <div
                key={val}
                className="flex rounded-full bg-gray-100 px-2.5 pb-1 pt-1.5 text-sm"
              >
                {t.tag.name}
              </div>
            ))}{' '}
          </div>
        </div>
      )}
    </div>
  );

  // return <pre>{JSON.stringify(tags, null, 2)}</pre>;
};
