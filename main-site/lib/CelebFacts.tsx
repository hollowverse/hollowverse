import { Fragment, ReactNode } from 'react';
import { Fact } from '~/lib/Fact';
import { InFeedAd } from '~/lib/InFeedAd';
import { Card } from '~/lib/Card';
import { TitledContent } from '~/lib/TitledContent';
import { Fact as TFact } from '~/lib/fact.projection';
import { CelebImage } from '~/lib/CelebImage';
import { celebNameToIssue } from '~/lib/celebNameToIssue';
import { CelebPageProps } from '~/lib/celebPage.getStaticProps';
import { Issue } from '~/lib/issue.projection';
import { IssueSelector, noIssueFilter } from '~/lib/IssueSelector';
import { Celeb } from '~/lib/celeb.projection';

export function CelebFactsIssueSelector(props: {
  celeb: Pick<CelebPageProps['celeb'], 'picture' | 'name' | 'slug'>;
  issues: Issue[];
  issue: Issue;
}) {
  return (
    <div className="-mr-5 flex gap-1">
      <div className="-my-2 w-[45px] shrink-0">
        <CelebImage
          picture={props.celeb.picture}
          name={props.celeb.name}
          className="rounded-md"
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
    </div>
  );
}

export function CelebFacts(props: {
  factGroup: TFact[];
  celeb: Celeb;
  slug: string;
  index?: number;
  showIssueName?: boolean;
  issues: Issue[];
  issue: Issue;
}) {
  const showIssueName = props.showIssueName ?? false;

  return (
    <TitledContent
      title={
        <div className="px-5 py-4">
          <CelebFactsIssueSelector {...props} />
        </div>
      }
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
                  celebName={props.celeb.name}
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
