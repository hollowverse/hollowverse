import levenshtein from 'fast-levenshtein';

export function sort(name: string, results: any[]) {
  return [...results].sort((a: any, b: any) => {
    const aDistance = levenshtein.get(name, a.result.name, {
      useCollator: true,
    });
    const bDistance = levenshtein.get(name, b.result.name, {
      useCollator: true,
    });

    if (aDistance > bDistance) {
      return 1;
    }

    if (aDistance < bDistance) {
      return -1;
    }

    return 0;
  });
}
