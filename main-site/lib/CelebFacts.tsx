import { Fragment, ReactNode } from 'react';
import { Fact } from '~/lib/Fact';
import { InFeedAd } from '~/lib/InFeedAd';
import { Card } from '~/lib/Card';
import { TitledContent } from '~/lib/TitledContent';
import { Fact as TFact } from '~/lib/fact.projection';

export function CelebFacts(props: {
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
      bottomStickyTitle
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
