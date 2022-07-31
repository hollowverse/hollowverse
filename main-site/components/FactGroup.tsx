import { Fragment, ReactNode } from 'react';
import { Fact } from '~/components/Fact';
import { InFeedAd } from '~/components/InFeedAd';
import { Card } from '~/components/ui/Card';
import { TitledContent } from '~/components/ui/TitledContent';
import { Fact as TFact } from '~/lib/groq/fact.projection';

export function FactGroup(props: {
  title: ReactNode;
  factGroup: TFact[];
  celebName: string;
  slug: string;
  index?: number;
  showIssueName?: boolean;
}) {
  const showIssueName = props.showIssueName ?? false;

  return (
    <TitledContent
      title={<div className="px-5 py-4">{props.title}</div>}
      stickyTitle
    >
      <div className="-mt-[1px] flex flex-col gap-3">
        {props.factGroup.map((fact, i) => {
          return (
            <Fragment key={fact._id}>
              <Card>
                <Fact
                  showIssueName={showIssueName}
                  link
                  fact={fact}
                  celebName={props.celebName}
                  slug={props.slug}
                />
              </Card>

              {props.index === 0 && i === 0 && <InFeedAd />}
            </Fragment>
          );
        })}
      </div>
    </TitledContent>
  );
}
