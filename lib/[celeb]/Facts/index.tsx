import React from 'react';
import { Card } from '~/lib/components/Card';
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
          <Card title={topic} key={`${topic}-${i}`} disablePadding>
            {factGroup.map((fact, innerI) => {
              return (
                <div key={`${topic}-${i}-${innerI}`}>
                  <Fact value={fact} />
                  {innerI !== factGroup.length - 1 && (
                    <div className="border-b" />
                  )}
                </div>
              );
            })}
          </Card>
        );
      })}
    </div>
  );
};
