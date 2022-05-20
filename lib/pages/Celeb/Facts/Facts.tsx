import React from 'react';
import { Fact } from '~/lib/pages/Celeb/Facts/Fact';
import { Card } from '~/lib/pages/components/Card';
import { useCelebContext } from '~/lib/pages/components/StaticPropsContextProvider';

export const Facts = () => {
  const context = useCelebContext();
  const { groups, topics } = context.celeb.facts!;

  return (
    <div className="gap-5">
      {topics.map((topic, i) => {
        const factGroup = groups[topic];

        return (
          <Card title={topic} disablePadding key={`${topic}-${i}`}>
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
