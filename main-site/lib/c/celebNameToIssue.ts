import { Issue } from '~/lib/i/issue.projection';

export function celebNameToIssue(celebName: string, issue: Issue) {
  return `${celebName}'s ${issue.isAffiliation ? '' : 'views on '}${
    issue.name
  }`;
}
