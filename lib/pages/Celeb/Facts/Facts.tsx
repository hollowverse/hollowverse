import React from 'react';
import { Card } from '~/lib/pages/components/Card';
import { useCelebContext } from '~/lib/pages/components/StaticPropsContextProvider';
import { Fact } from '~/lib/pages/Celeb/Facts/Fact';
import { ForumInvite } from '~/lib/pages/Celeb/ForumInvite';

export const Facts = () => {
  const context = useCelebContext();
  const { groups, topics } = context.celeb.facts!;

  return (
    <div className="gap-5">
      {topics.map((topic, i) => {
        const factGroup = groups[topic];

        return (
          <div key={`${topic}-${i}`}>
            <Card title={topic} disablePadding>
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
            {i === 0 && <ForumInvite name={context.celeb.name} />}
          </div>
        );
      })}
    </div>
  );
};
