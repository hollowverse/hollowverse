import groq from 'groq';
import { FactTypes } from '~/lib/groq/fact.projection';
import { Issue } from '~/lib/groq/issue.projection';
import { Picture } from '~/lib/groq/picture.projection';
import { Tag, tagProjection } from '~/lib/groq/tag.projection';

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
  tags: Tag[];
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
${tagProjection},
'issues': topics[]->{name},
'name': celeb->name,
'slug': celeb->slug.current,
'picture': celeb->picture.asset->
`;
