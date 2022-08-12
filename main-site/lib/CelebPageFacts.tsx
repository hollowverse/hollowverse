import { CelebImage } from '~/lib/CelebImage';
import { CelebFacts } from '~/lib/CelebFacts';
import { IssueSelector, noIssueFilter } from '~/lib/IssueSelector';
import { CelebPageProps } from '~/lib/celebPage.getStaticProps';
import { Issue } from '~/lib/issue.projection';
import { celebNameToIssue } from '~/lib/celebNameToIssue';
import { Pagination } from '~/lib/Pagination';
import { NavigationTip } from '~/lib/NavigationTip';

export const CelebPageFacts = (props: CelebPageProps) => {
  return (
    <div className="flex max-w-full flex-col gap-7">
      <NavigationTip celebName={props.celeb.name} />

      <div className="flex flex-col gap-2.5">
        <CelebFacts
          showIssueName
          factGroup={props.facts}
          celeb={props.celeb}
          issue={noIssueFilter}
          issues={props.issues}
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
