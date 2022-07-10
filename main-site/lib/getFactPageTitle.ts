import { Fact } from '~/lib/groq/fact.projection';

export function getFactPageTitle(
  celebName: string,
  fact: Fact,
  length: number,
) {
  let text: string;

  if (fact.type === 'quote') {
    text = `${celebName}: ${fact.quote}`;
  } else {
    text = fact.content;
  }

  return text.substring(0, length) + '...';
}
