import { CelebTag, Tag } from '~/lib/t/tag.projection';

export function tagIsVerb(tag: Tag) {
  if (tag.isVerb !== null) {
    return tag.isVerb;
  }

  const tagName = tag.name;
  const tokens = tagName.split(' ');

  if (tokens.length === 1) {
    return false;
  }

  if (tokens[0].toLowerCase() === "doesn't") {
    return true;
  }

  if (tokens[0].slice(-2) === "'s") {
    return false;
  }

  if (tokens[0].slice(-1) === 's') {
    return true;
  }

  return false;
}
