import { Celeb } from '~/lib/celeb.projection';
import { Fact } from '~/lib/fact.projection';

export function getFactPagePathname(celebSlug: Celeb['slug'], fact: Fact) {
  return `/${celebSlug}/fact/${fact._id}`;
}
