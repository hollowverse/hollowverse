import { fromPairs } from 'lodash-es';

/**
 * Converts a string such as p/2/t/some-id,another-id to an object such as
 *
 * ```js
 * {
 *  p: '2',
 *  t: 'some-id,another-id'
 * }
 * ```
 */
export function parseCatchAllParams(catchAllParams: string[]) {
  const pairs: [string, string][] = [];

  for (let i = 0; i < catchAllParams.length; i = i + 2) {
    pairs.push([catchAllParams[i], catchAllParams[i + 1]]);
  }

  return fromPairs(pairs);
}
