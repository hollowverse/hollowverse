import { useRouter } from 'next/router';
import { SideScroller } from '~/components/ui/SideScroller';
import { c } from '~/lib/c';
import { Issue } from '~/lib/groq/issue.projection';
import { Link } from '~/lib/Link';

export const noIssueFilter: Issue = {
  _id: 'all-issue-filter',
  isAffiliation: true,
  name: 'All Issues',
};

export function IssueSelector(props: {
  issues: Issue[];
  isSelected: (i: Issue) => boolean;
  getLink: (issueId: Issue['_id']) => string;
  getAnchorTitle?: (issue: Issue) => string;
}) {
  const router = useRouter();
  const { issueId } = router.query;
  const allIssues: Issue[] = [noIssueFilter, ...props.issues];

  return (
    <SideScroller className="border-none py-2 px-5" key={issueId as string}>
      {allIssues.map((i) => {
        return (
          <Link key={i._id} passHref href={props.getLink(i._id)}>
            <a
              title={getTitle()}
              id="scroller-issue-item"
              className={c(
                'flex items-center px-4 default:text-lg default:text-neutral-600',
                {
                  'rounded-full bg-blue-100 text-base font-bold text-blue-500':
                    props.isSelected(i),
                },
              )}
            >
              <div className="py-1">
                <div className="flex items-center justify-center gap-1">
                  <p className="w-max">{i.name}</p>
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
