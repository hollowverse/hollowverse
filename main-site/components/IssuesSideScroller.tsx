import { Card } from '~/components/ui/Card';
import { PurpleDot } from '~/components/ui/PurpleDot';
import { SideScroller } from '~/components/ui/SideScroller';
import { Issue } from '~/lib/groq/issue.projection';
import { Link } from '~/lib/Link';

export function IssuesSideScroller(props: {
  issues: Issue[];
  getLink: (issueId: Issue['_id']) => string;
  getAnchorTitle?: (issue: Issue) => string;
  getLabel?: (issue: Issue) => string;
  showViewsOn?: boolean;
}) {
  const showViewsOn = props.showViewsOn ?? false;
  const getLabel =
    props.getLabel ??
    ((i: Issue) => {
      return i.isAffiliation && showViewsOn ? `Views on ${i.name}` : i.name;
    });

  return (
    <SideScroller>
      {props.issues.map((i) => {
        return (
          <Link key={i._id} passHref href={props.getLink(i._id)}>
            <a title={getTitle()} id="scroller-issue-item">
              <div className="p-2">
                <div className="flex items-center justify-center gap-1 text-base text-neutral-700">
                  <p className="w-max text-lg text-neutral-600">
                    {getLabel(i)}
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
