import React, { ReactNode } from 'react';
import { Fact } from '~/components/Fact';
import { Card2 } from '~/components/ui/Card2';
import { TitledContent } from '~/components/ui/TitledContent';
import { Fact as TFact } from '~/lib/groq/fact.projection';

export function FactGroup(props: {
  title: ReactNode;
  factGroup: TFact[];
  celebName: string;
  slug: string;
}) {
  return (
    <TitledContent
      title={<div className="px-5 py-4">{props.title}</div>}
      stickyTitle
    >
      <div className="-mt-[1px] flex flex-col gap-3">
        {props.factGroup.map((fact) => {
          return (
            <Card2 key={fact._id}>
              <div className="p-5">
                <Fact
                  link
                  fact={fact}
                  celebName={props.celebName}
                  slug={props.slug}
                />
              </div>
            </Card2>
          );
        })}
      </div>
    </TitledContent>
  );
}
