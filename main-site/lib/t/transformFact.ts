import { Fact } from '~/lib/f/fact.projection';
import { formatFactDate } from '~/lib/date';
import { filterBadWords } from '~/lib/f/filterBadWords';

export function transformFact<T extends Fact>(fact: T): T {
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
    obj[p] = fact[p] ? filterBadWords(fact[p]) : null;
  });

  return obj;
}
