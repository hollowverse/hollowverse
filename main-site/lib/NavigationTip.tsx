import { celebNameToIssue } from '~/lib/celebNameToIssue';
import { Issue } from '~/lib/issue.projection';

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
      .
    </p>
  );
}
