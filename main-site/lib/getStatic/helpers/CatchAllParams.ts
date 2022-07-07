import { fromPairs } from 'lodash-es';

type ParamDefinition = {
  name: string;
  isArray?: boolean;
};

export class CatchAllParams<T extends readonly ParamDefinition[]> {
  constructor(private paramDefinitions: T) {}

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
  parse<T extends { [name: string]: string | string[] }>(paramsArr: string[]) {
    const pairs: [string, string | string[]][] = [];

    for (let i = 0; i < paramsArr.length; i = i + 2) {
      const d = this.paramDefinitions.find((d) => d.name == paramsArr[i]);
      if (d) {
        const name = d.name;
        const val = d.isArray ? paramsArr[i + 1].split(',') : paramsArr[i + 1];

        pairs.push([name, val]);
      }
    }

    return fromPairs(pairs) as T;
  }

  /**
   * Reverses the above
   */
  stringify(paramsObj: { [name in T[number]['name']]: string | number }) {
    let results: any[] = [];

    (this.paramDefinitions as any).forEach((paramName: any) => {
      const val = (paramsObj as any)[paramName];
      if (val) {
        results.push(`${paramName}/${val}`);
      }
    });

    return results.join('/');
  }
}
