import { isEmpty } from 'lodash-es';
import { IssuesSideScroller } from '~/components/IssuesSideScroller';
import { Issue } from '~/lib/groq/issue.projection';
import { celebNameToIssue } from '~/lib/language/celebNameToIssue';

export function CelebViewsSelector(props: {
  celebName: string;
  slug: string;
  issues: { affiliations: Issue[]; views: Issue[] };
}) {
  const combinedIssues = [...props.issues.affiliations, ...props.issues.views];

  return (
    <>
      {!isEmpty(combinedIssues) && (
        <div className="flex flex-col gap-2.5">
          <IssuesSideScroller
            getAnchorTitle={(i) => celebNameToIssue(props.celebName, i)}
            showViewsOn
            issues={combinedIssues}
            getLink={(_id) => `/${props.slug}/issue/${_id}`}
            getLabel={(i) => `On ${i.name}`}
          />
        </div>
      )}
    </>
  );
}
