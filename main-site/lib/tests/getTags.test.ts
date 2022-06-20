import { rollUp, sortTags } from '~/lib/getTags';
import { mockOrderOfIssues } from '~/lib/tests/mockOrderOfIssues';

test('sortTags to remove dupes', () => {
  expect(
    sortTags(
      [
        {
          _id: 'id',
          isBackground: null,
          isLowConfidence: null,
          tag: {
            issue: {
              name: 'Environment',
            },
            name: 'Environmentalist',
          },
        },
        {
          _id: 'id',
          isBackground: null,
          isLowConfidence: null,
          tag: {
            issue: {
              name: 'Environment',
            },
            name: 'Environmentalist',
          },
        },
      ],
      mockOrderOfIssues,
    ),
  ).toMatchSnapshot();
});

test('sortTags to remove unnecessary lowConfidence tags', () => {
  expect(
    sortTags(
      [
        {
          _id: 'id',
          isBackground: null,
          isLowConfidence: true,
          tag: {
            issue: {
              name: 'Environment',
            },
            name: 'Environmentalist',
          },
        },
        {
          _id: 'id',
          isBackground: null,
          isLowConfidence: null,
          tag: {
            issue: {
              name: 'Environment',
            },
            name: 'Environmentalist',
          },
        },
      ],
      mockOrderOfIssues,
    ),
  ).toMatchSnapshot();

  expect(
    sortTags(
      [
        {
          _id: 'id',
          isBackground: null,
          isLowConfidence: null,
          tag: {
            issue: {
              name: 'Environment',
            },
            name: 'Environmentalist',
          },
        },
        {
          _id: 'id',
          isBackground: null,
          isLowConfidence: true,
          tag: {
            issue: {
              name: 'Environment',
            },
            name: 'Environmentalist',
          },
        },

        {
          _id: 'id',
          isBackground: null,
          isLowConfidence: true,
          tag: {
            issue: {
              name: 'Environment',
            },
            name: 'Environmentalist',
          },
        },
        {
          _id: 'id',
          isBackground: null,
          isLowConfidence: true,
          tag: {
            issue: {
              name: 'Environment',
            },
            name: 'foobar',
          },
        },
        {
          _id: 'id',
          isBackground: null,
          isLowConfidence: null,
          tag: {
            issue: {
              name: 'Environment',
            },
            name: 'Environmentalist',
          },
        },
      ],
      mockOrderOfIssues,
    ),
  ).toMatchSnapshot();
});

test('sortTags should sort by order of issues', () => {
  expect(
    sortTags(
      [
        {
          _id: 'id',
          isBackground: null,
          isLowConfidence: null,
          tag: {
            issue: {
              name: 'LGBT',
            },
            name: 'Supports LGBT',
          },
        },
        {
          _id: 'id',
          isBackground: null,
          isLowConfidence: null,
          tag: {
            issue: {
              name: 'Environment',
            },
            name: 'Pro Nuclear Power',
          },
        },
        {
          _id: 'id',
          isBackground: false,
          isLowConfidence: true,
          tag: {
            issue: {
              name: 'Religion',
            },
            name: 'Not Religious',
          },
        },
      ],
      mockOrderOfIssues,
    ),
  ).toMatchSnapshot();
});

describe('rollUp', () => {
  describe('simple case', () => {
    expect(
      rollUp([
        ['2020', ['a', 'b', 'c']],
        ['2019', ['d', 'e', 'f']],
      ] as any),
    ).toEqual([['2020-2019', ['a', 'b', 'c', 'd', 'e', 'f']]]);
  });

  describe('never less than five per period', () => {
    expect(
      rollUp([
        ['2020', ['a', 'b', 'c', 'd', 'e', 'f']],
        ['2019', ['d', 'e', 'f']],
      ] as any),
    ).toEqual([['2020-2019', ['a', 'b', 'c', 'd', 'e', 'f', 'd', 'e', 'f']]]);
  });

  describe('last and previous years are short', () => {
    expect(
      rollUp([
        ['2020', ['a', 'b', 'c']],
        ['2019', ['d', 'e', 'f']],
        ['2018', ['g', 'h', 'i', 'j', 'k']],
      ] as any),
    ).toEqual([
      ['2020-2019', ['a', 'b', 'c', 'd', 'e', 'f']],
      ['2018', ['g', 'h', 'i', 'j', 'k']],
    ]);
  });

  describe('only last year is short', () => {
    expect(
      rollUp([
        ['2020', ['a', 'b']],
        ['2019', ['e', 'f', 'g', 'h', 'i']],
        ['2018', ['g', 'h', 'i', 'j', 'k']],
      ] as any),
    ).toEqual([
      ['2020', ['a', 'b']],
      ['2019', ['e', 'f', 'g', 'h', 'i']],
      ['2018', ['g', 'h', 'i', 'j', 'k']],
    ]);
  });

  describe('a period can grow larger than might be expected', () => {
    expect(
      rollUp([
        ['2022', ['a', 'b', 'c', 'd', 'e', 'f']],
        ['2021', ['g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p']],
        ['2020', ['q']],
        ['2018', ['r', 's']],
        ['2017', ['t']],
      ] as any),
    ).toEqual([
      ['2022', ['a', 'b', 'c', 'd', 'e', 'f']],
      [
        '2021-2017',
        ['g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'],
      ],
    ]);
  });
});
