import groq from 'groq';
import { sanityClient } from '../shared/lib/sanityio';

export function isUniqueField(
  type: string,
  fieldName: string,
  value: string,
  context: { document: { _id: string } },
) {
  const { document } = context;

  const id = document._id.replace(/^drafts\./, '');

  const query = groq`!defined(*[
    _type == $type &&
    !(_id in [$draft, $published]) &&
    $fieldName == $value
  ][0]._id)`;

  return sanityClient.fetch(`check-${fieldName}-uniqueness`, query, {
    draft: `drafts.${id}`,
    published: id,
    value,
    type,
    fieldName,
  });
}
