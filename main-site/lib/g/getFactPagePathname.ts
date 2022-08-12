import { Celeb } from '~/lib/c/celeb.projection';
import { Fact } from '~/lib/f/fact.projection';

export function getFactPagePathname(celebSlug: Celeb['slug'], fact: Fact) {
  return `/${celebSlug}/fact/${fact._id}`;
}
