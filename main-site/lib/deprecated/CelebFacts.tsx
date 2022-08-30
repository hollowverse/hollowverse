import { Fragment } from 'react';
import { Card } from '~/lib/Card.ui';
import { Celeb } from '~/lib/celeb.projection';
import { Fact } from '~/lib/Fact';
import { Fact as TFact } from '~/lib/fact.projection';
import { InFeedAd } from '~/lib/InFeedAd';

export function CelebFacts(props: {
  factGroup: TFact[];
  celeb: Celeb;
  slug: string;
  index?: number;
  showIssueName?: boolean;
  // issues: Issue[];
  // issue: Issue;
}) {
  const showIssueName = props.showIssueName ?? false;

  return (
    <div className="relative z-0 flex flex-col gap-3">
      {props.factGroup.map((fact, i) => {
        return (
          <Fragment key={fact._id}>
            <Card>
              <Fact
                showIssueName={showIssueName}
                link
                fact={fact}
                celebName={props.celeb.name}
                slug={props.slug}
              />
            </Card>

            {props.index === 0 && i === 0 && <InFeedAd />}
          </Fragment>
        );
      })}

      {/* <div className="sticky bottom-0 z-10 p-2">
        <div className="relative flex gap-1 rounded-md border border-neutral-800 bg-gray-700 shadow-lg">
          <div className="w-[45px] shrink-0">
            <CelebImage
              className="rounded-tl-md rounded-bl-md"
              picture={props.celeb.picture}
              name={props.celeb.name}
            />
          </div>

          <IssueSelector
            useCardTitleStyle={true}
            getAnchorTitle={(i) => celebNameToIssue(props.celeb.name, i)}
            isSelected={(i) => i._id === props.issue._id}
            issues={props.issues}
            getLink={(_id) =>
              _id === noIssueFilter._id
                ? `/${props.celeb.slug}`
                : `/${props.celeb.slug}/issue/${_id}`
            }
          />

          <div className="pointer-events-none absolute right-0 h-full w-24 rounded-md bg-gradient-to-r from-transparent via-transparent to-neutral-700" />
        </div>
      </div> */}
    </div>
  );
}
