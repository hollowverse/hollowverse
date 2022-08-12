import { Issue } from '~/lib/issue.projection';

export function celebNameToIssue(celebName: string, issue: Issue) {
  return `${celebName}'s ${issue.isAffiliation ? '' : 'views on '}${
    issue.name
  }`;
}
