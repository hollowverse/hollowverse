import groq from 'groq';
import { sanityClient } from '../shared/lib/sanityio';

export function isUniqueKnowledgeGraphId(knowledgeGraphId, context) {
  const { document } = context;

  const id = document._id.replace(/^drafts\./, '');

  const params = {
    draft: `drafts.${id}`,
    published: id,
    knowledgeGraphId: knowledgeGraphId,
  };

  const query = groq`!defined(*[
    _type == 'celeb' &&
    !(_id in [$draft, $published]) &&
    knowledgeGraphId == $knowledgeGraphId
  ][0]._id)`;

  return sanityClient.fetch('check-knowledge-graph-id', query, params);
}
