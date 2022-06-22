import React from 'react';
import { FactGroup } from '~/components/FactGroup';
import { TitleSeparator } from '~/components/TitleSeparator';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';

export const Facts = (props: CelebPageProps) => {
  const { groups, issues } = props.celeb.facts!;

  return (
    <div className="FACTS-CONTAINER mt-5 flex max-w-full flex-col gap-7">
      {issues.map((issue, i) => {
        const factGroup = groups[issue];

        return (
          <FactGroup
            key={issue}
            title={
              <h2 className="flex gap-2">
                {props.celeb.name} <TitleSeparator /> {issue}
              </h2>
            }
            factGroup={factGroup}
            celebName={props.celeb.name}
            slug={props.celeb.slug}
          />
        );
      })}
    </div>
  );
};
