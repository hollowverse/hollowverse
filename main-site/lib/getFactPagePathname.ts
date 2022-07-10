import { Celeb } from '~/lib/groq/celeb.projection';
import { Fact } from '~/lib/groq/fact.projection';

export function getFactPagePathname(celebSlug: Celeb['slug'], fact: Fact) {
  return `${celebSlug}/fact/${fact._id}`;
}
