import React from 'react';
import { Card } from '~/components/Card';
import { Fact } from '~/components/Fact';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';

export const Facts = (props: CelebPageProps) => {
  const { groups, topics } = props.celeb.facts!;

  return (
    <div className="FACTS-CONTAINER mt-5 flex max-w-full flex-col gap-5">
      {topics.map((topic, i) => {
        const factGroup = groups[topic];

        return (
          <Card
            title={
              <h2 className="overflow-hidden text-ellipsis whitespace-nowrap">
                {props.celeb.name} / {topic}
              </h2>
            }
            stickyTitle
            disablePadding
            key={`${topic}-${i}`}
          >
            {factGroup.map((fact, innerI) => {
              return (
                <div key={`${topic}-${i}-${innerI}`}>
                  <Fact
                    fact={fact}
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
