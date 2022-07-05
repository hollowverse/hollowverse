import { Fact } from '~/lib/groq/fact.projection';
import Filter from 'bad-words';
import { formatFactDate } from '~/lib/date';

const replaceRegex = /(?<=.).+(?=.)/;
const placeHolder = ((str: string) => '*'.repeat(str.length)) as any;

const filter = new Filter({ replaceRegex, placeHolder });

filter.removeWords(
  'God-damned',
  'god',
  'damn',
  'damned',
  'butt-pirate',
  'butt',
  'pirate',
);

export function transformFact(fact: Fact): Fact {
  return {
    ...fact,
    ...clean(fact, ['context', 'quote', 'content']),
    date: formatFactDate(fact.date),
  };
}

function clean(fact: Fact, listOfProps: string[]) {
  const obj: { [name: string]: any } = {};

  listOfProps.forEach((p) => {
    // @ts-ignore
    obj[p] = fact[p] ? filter.clean(fact[p]) : null;
  });

  return obj;
}
