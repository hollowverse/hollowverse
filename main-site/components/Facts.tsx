import { CelebImage } from '~/components/CelebImage';
import { FactGroup } from '~/components/FactGroup';
import { IssueSelector, noIssueFilter } from '~/components/IssueSelector';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';
import { Issue } from '~/lib/groq/issue.projection';
import { celebNameToIssue } from '~/lib/language/celebNameToIssue';

export function NavigationTip(props: { celebName: string; issue?: Issue }) {
  return (
    <p className="px-5 font-bold">
      👇 Below is evidence of{' '}
      {!props.issue ? (
        <span className="underline">
          {props.celebName}&apos;s politics and beliefs
        </span>
      ) : (
        <span className="underline">
          {celebNameToIssue(props.celebName, props.issue)}
        </span>
      )}
      . Have a read! Or use the links at the bottom to see evidence for a
      specific topic
    </p>
  );
}

export function CelebFactGroupTitle(props: {
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

export const Facts = (props: CelebPageProps) => {
  return (
    <div className="FACTS-CONTAINER flex max-w-full flex-col gap-7">
      <NavigationTip celebName={props.celeb.name} />

      <div className="flex flex-col gap-2.5">
        <FactGroup
          showIssueName
          title={<CelebFactGroupTitle {...props} issue={noIssueFilter} />}
          factGroup={props.facts}
          celebName={props.celeb.name}
          slug={props.celeb.slug}
        />
      </div>
    </div>
  );
};
