import groq from 'groq';
import { FactTypes } from '~/lib/fact.projection';
import { Issue } from '~/lib/issue.projection';
import { Picture } from '~/lib/picture.projection';
import { CelebTag, celebTagProjection } from '~/lib/tag.projection';

export type ContentChange = {
  _id: string;
  _createdAt: string;
  content: string;
  context: string;
  quote: string;
  date: string;
  forumLink: string;
  source: string;
  type: FactTypes;
  tags: CelebTag[];
  issues: Issue[];
  name: string;
  slug: string;
  picture: Picture;
};

export const contentChangeProjection = groq`
_id,
_createdAt,
content,
context,
quote,
date,
forumLink,
source,
type,
${celebTagProjection},
'issues': topics[]->{name},
'name': celeb->name,
'slug': celeb->slug.current,
'picture': celeb->picture.asset->
`;
