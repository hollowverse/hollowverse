import { Chip } from "@mui/material";
import React from "react";
import { useCelebContext } from "~/lib/components/StaticPropsContextProvider";


export const TagCollection = () => {
  const tags = useCelebContext().celeb.tags!;

  //logan's comment, celeb tags

  return (
    <div className="f-full">
      <div className="mx-auto flex flex-wrap gap-2.5">
        {tags.regular.map((t) => (
          <Chip key={t.tag.name} label={t.tag.name} className="bg-gray-100" />
        ))}
      </div>

      {tags.lowConfidence.length > 0 && (
        <div className="mt-2.5 flex items-center gap-1.5">
          <div className="text-xs tracking-wide text-neutral-400">Maybe:</div>

          <div className="flex flex-wrap gap-2.5">
            {tags.lowConfidence.map((t) => (
              <Chip key={t.tag.name} label={t.tag.name} className="bg-gray-100" />
            ))}{" "}
          </div>
        </div>
      )}
    </div>
  );

  // return <pre>{JSON.stringify(tags, null, 2)}</pre>;
};
