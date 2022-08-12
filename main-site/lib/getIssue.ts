import groq from 'groq';
import { Issue } from '~/lib/issue.projection';
import { sanityClient } from '~/shared/lib/sanityio';

export async function getIssue(issueId: string) {
  return sanityClient.fetch<Issue>(
    'issue',
    groq`*[_type == 'topic' && _id == $issueId][0]`,
    { issueId },
  );
}
