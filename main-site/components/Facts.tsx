import React from 'react';
import { Card } from '~/components/Card';
import { Fact } from '~/components/Fact';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';

export const Facts = (props: CelebPageProps) => {
  const { groups, issues } = props.celeb.facts!;

  return (
    <div className="FACTS-CONTAINER mt-5 flex max-w-full flex-col gap-7">
      {issues.map((issue, i) => {
        const factGroup = groups[issue];

        return (
          <Card
            title={
              <h2 className="overflow-hidden text-ellipsis whitespace-nowrap">
                {props.celeb.name} / {issue}
              </h2>
            }
            stickyTitle
            disablePadding
            key={`${issue}-${i}`}
          >
            {factGroup.map((fact, innerI) => {
              return (
                <div key={`${issue}-${i}-${innerI}`}>
                  <Fact
                    fact={fact}
                    celebName={props.celeb.name}
                    linkSlug={props.celeb.slug}
                  />
                  {innerI !== factGroup.length - 1 && (
                    <div className="h-5 border-b border-t bg-gray-100 lg:-ml-[1px] lg:-mr-[1px]" />
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
