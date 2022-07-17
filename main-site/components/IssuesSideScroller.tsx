import { PurpleDot } from '~/components/ui/PurpleDot';
import { SideScroller } from '~/components/ui/SideScroller';
import { Issue } from '~/lib/groq/issue.projection';
import { Link } from '~/lib/Link';

export function IssuesSideScroller(props: {
  issues: Issue[];
  getLink: (issueId: Issue['_id']) => string;
  getAnchorTitle?: (issueId: Issue) => string;
  showViewsOn?: boolean;
}) {
  const showViewsOn = props.showViewsOn ?? false;

  return (
    <SideScroller>
      {props.issues.map((i) => {
        return (
          <Link key={i._id} passHref href={props.getLink(i._id)}>
            <a title={getTitle()} id="scroller-issue-item">
              <div className="p-2">
                <div className="flex items-center justify-center gap-1 text-base text-neutral-700">
                  <PurpleDot />
                  <p className="h-issue-highlight w-max text-lg font-semibold text-neutral-600">
                    {!i.isAffiliation && showViewsOn ? 'Views on ' : ''}
                    {i.name}
                  </p>
                </div>
              </div>
            </a>
          </Link>
        );

        function getTitle() {
          if (props.getAnchorTitle) {
            return props.getAnchorTitle(i);
          }

          return i.isAffiliation ? `Views on ${i.name}` : i.name;
        }
      })}
    </SideScroller>
  );
}
