import { isEmpty } from 'lodash-es';
import { IssuesSideScroller } from '~/components/IssuesSideScroller';
import { Issue } from '~/lib/groq/issue.projection';

export function CelebViewsSelector(props: {
  celebName: string;
  slug: string;
  issues: { affiliations: Issue[]; views: Issue[] };
}) {
  return (
    <>
      {!isEmpty(props.issues.affiliations) && (
        <div className="flex flex-col gap-2.5">
          <h2 className="scale-y-110 px-5 font-semibold">
            {props.celebName}&apos;s
          </h2>

          <IssuesSideScroller
            issues={[...props.issues.affiliations, ...props.issues.views]}
            getLink={(_id) => `/${props.slug}/issue/${_id}`}
          />
        </div>
      )}
    </>
  );
}
