import { PurpleDot } from '~/components/ui/PurpleDot';
import { SideScroller } from '~/components/ui/SideScroller';
import { Issue } from '~/lib/groq/issue.projection';
import { Link } from '~/lib/Link';

export function IssuesSideScroller(props: {
  issues: Issue[];
  getLink: (issueId: Issue['_id']) => string;
}) {
  return (
    <SideScroller>
      {props.issues.map((i) => {
        return (
          <Link key={i._id} passHref href={props.getLink(i._id)}>
            <a>
              <div
                id="celeb-issue-item"
                className="mb-2 rounded-sm border bg-white p-2 px-3 shadow-sm"
              >
                <div className="flex items-center justify-center gap-3 text-base text-neutral-700">
                  <PurpleDot />
                  <p className="w-max text-lg text-neutral-600">{i.name}</p>
                </div>
              </div>
            </a>
          </Link>
        );
      })}
    </SideScroller>
  );
}
