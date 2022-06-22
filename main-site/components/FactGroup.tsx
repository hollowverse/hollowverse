import React, { ReactNode } from 'react';
import { Card } from '~/components/Card';
import { Fact } from '~/components/Fact';
import { Fact as TFact } from '~/lib/groq/fact.projection';

export function FactGroup(props: {
  title: ReactNode;
  factGroup: TFact[];
  celebName: string;
  slug: string;
}) {
  return (
    <Card title={props.title} stickyTitle disablePadding>
      {props.factGroup.map((fact, i) => {
        return (
          <div key={fact._id}>
            <Fact
              link
              fact={fact}
              celebName={props.celebName}
              slug={props.slug}
            />
            {i !== props.factGroup.length - 1 && (
              <div className="h-5 border-b border-t bg-gray-100 lg:-ml-[1px] lg:-mr-[1px]" />
            )}
          </div>
        );
      })}
    </Card>
  );
}
