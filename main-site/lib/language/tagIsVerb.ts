import { CelebTag } from '~/lib/groq/tag.projection';

export function tagIsVerb(tag: CelebTag) {
  if (tag.tag.isVerb !== null) {
    return tag.tag.isVerb;
  }

  const tagName = tag.tag.name;
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
