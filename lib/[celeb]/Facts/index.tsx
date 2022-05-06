import React from 'react';
import { Separator } from '~/lib/components/Separator';
import { useCelebContext } from '~/lib/components/StaticPropsContextProvider';
import { Fact } from '~/lib/[celeb]/Facts/Fact';

export const Facts = () => {
  const context = useCelebContext();
  const { groups, topics } = context.celeb.facts!;

  return (
    <div className="flex flex-col gap-5">
      {topics.map((topic, i) => {
        const factGroup = groups[topic];

        return (
          <div key={`${topic}-${i}`}>
            <Separator title={topic} className="" />

            {factGroup.map((fact, innerI) => {
              return (
                <div key={`${topic}-${i}-${innerI}`}>
                  <Fact value={fact} />
                  {innerI !== factGroup.length - 1 && (
                    <Separator minor className="" />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
