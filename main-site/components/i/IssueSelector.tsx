import { SideScroller } from '~/components/s/SideScroller';
import { c } from '~/lib/c';
import { Issue } from '~/lib/groq/issue.projection';
import { Link } from '~/components/l/Link';
import { PropsWithChildren } from 'react';

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
  useCardTitleStyle?: boolean;
}) {
  const useCardTitleStyle = props.useCardTitleStyle ?? false;
  const allIssues: Issue[] = [noIssueFilter, ...props.issues];

  if (useCardTitleStyle) {
    return (
      <div className="no-scrollbar -my-2 flex items-center gap-4 overflow-scroll rounded-l-md bg-gray-50 p-2 pl-4 pr-10 text-sm font-bold shadow-inner">
        {allIssues.map((i) => {
          return (
            <IssueLink
              key={i._id}
              i={i}
              className={c('whitespace-nowrap', {
                'h-link underline': props.isSelected(i),
              })}
            >
              {i.name}
            </IssueLink>
          );
        })}
      </div>
    );
  }

  return (
    <SideScroller className="border-none py-2 px-5">
      {allIssues.map((i) => {
        return (
          <IssueLink
            key={i._id}
            i={i}
            className={c(
              'flex items-center px-4 hover:underline default:text-lg default:text-neutral-600',
              {
                'rounded-full bg-blue-100 text-base font-bold text-blue-500':
                  props.isSelected(i),
              },
            )}
          >
            <span className="whitespace-nowrap p-1">{i.name}</span>
          </IssueLink>
        );
      })}
    </SideScroller>
  );

  function IssueLink(
    props_: PropsWithChildren<{ i: Issue; className: string }>,
  ) {
    return (
      <Link key={props_.i._id} passHref href={props.getLink(props_.i._id)}>
        <a
          title={getTitle(props_.i)}
          className={props_.className}
          id="scroller-issue-item"
        >
          {props_.children}
        </a>
      </Link>
    );
  }

  function getTitle(i: Issue) {
    if (props.getAnchorTitle) {
      return props.getAnchorTitle(i);
    }

    return i.isAffiliation ? `Views on ${i.name}` : i.name;
  }
}
