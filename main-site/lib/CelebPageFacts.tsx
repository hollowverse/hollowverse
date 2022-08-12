import { CelebImage } from '~/lib/CelebImage';
import { CelebFacts } from '~/lib/CelebFacts';
import { IssueSelector, noIssueFilter } from '~/lib/IssueSelector';
import { CelebPageProps } from '~/lib/celebPage.getStaticProps';
import { Issue } from '~/lib/issue.projection';
import { celebNameToIssue } from '~/lib/celebNameToIssue';
import { Pagination } from '~/lib/Pagination';
import { NavigationTip } from '~/lib/NavigationTip';

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

export const CelebPageFacts = (props: CelebPageProps) => {
  return (
    <div className="FACTS-CONTAINER flex max-w-full flex-col gap-7">
      <NavigationTip celebName={props.celeb.name} />

      <div className="flex flex-col gap-2.5">
        <CelebFacts
          showIssueName
          title={<CelebFactGroupTitle {...props} issue={noIssueFilter} />}
          factGroup={props.facts}
          celebName={props.celeb.name}
          slug={props.celeb.slug}
        />
      </div>

      <Pagination
        {...props.pagination}
        getLink={(pageNumber) =>
          pageNumber === 1
            ? `/${props.celeb.slug}`
            : `/${props.celeb.slug}/p/${pageNumber}#content`
        }
      />
    </div>
  );
};
