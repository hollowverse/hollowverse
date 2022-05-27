import React from 'react';
import { Fact } from '~/components/Fact';
import { Card } from '~/components/Card';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';

export const Facts = (props: CelebPageProps) => {
  const { groups, topics } = props.celeb.facts!;

  return (
    <div className="FACTS-CONTAINER mt-5 flex flex-col gap-5">
      {topics.map((topic, i) => {
        const factGroup = groups[topic];

        return (
          <Card title={topic} disablePadding key={`${topic}-${i}`}>
            {factGroup.map((fact, innerI) => {
              return (
                <div key={`${topic}-${i}-${innerI}`}>
                  <Fact
                    value={fact}
                    celebName={props.celeb.name}
                    linkSlug={props.celeb.slug}
                  />
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
