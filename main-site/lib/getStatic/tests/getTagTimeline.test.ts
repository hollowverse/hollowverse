import { rollUp } from '~/lib/getStatic/getTagTimeline';
import { sortTags } from '~/lib/getStatic/sortTags';
import { mockOrderOfIssues } from '~/lib/getStatic/tests/mockOrderOfIssues';

test('sortTags to remove dupes', () => {
  expect(
    sortTags(
      [
        {
          isBackground: null,
          isLowConfidence: null,
          tag: {
            _id: 'id',
            issue: {
              _id: 'id',
              name: 'Environment',
            },
            name: 'Environmentalist',
          },
        },
        {
          isBackground: null,
          isLowConfidence: null,
          tag: {
            _id: 'id',
            issue: {
              _id: 'id',
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
          isBackground: null,
          isLowConfidence: true,
          tag: {
            _id: 'id',
            issue: {
              _id: 'id',
              name: 'Environment',
            },
            name: 'Environmentalist',
          },
        },
        {
          isBackground: null,
          isLowConfidence: null,
          tag: {
            _id: 'id',
            issue: {
              _id: 'id',
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
          isBackground: null,
          isLowConfidence: null,
          tag: {
            _id: 'id',
            issue: {
              _id: 'id',
              name: 'Environment',
            },
            name: 'Environmentalist',
          },
        },
        {
          isBackground: null,
          isLowConfidence: true,
          tag: {
            _id: 'id',
            issue: {
              _id: 'id',
              name: 'Environment',
            },
            name: 'Environmentalist',
          },
        },

        {
          isBackground: null,
          isLowConfidence: true,
          tag: {
            _id: 'id',
            issue: {
              _id: 'id',
              name: 'Environment',
            },
            name: 'Environmentalist',
          },
        },
        {
          isBackground: null,
          isLowConfidence: true,
          tag: {
            _id: 'id',
            issue: {
              _id: 'id',
              name: 'Environment',
            },
            name: 'foobar',
          },
        },
        {
          isBackground: null,
          isLowConfidence: null,
          tag: {
            _id: 'id',
            issue: {
              _id: 'id',
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
          isBackground: null,
          isLowConfidence: null,
          tag: {
            _id: 'id',
            issue: {
              _id: 'id',
              name: 'LGBT',
            },
            name: 'Supports LGBT',
          },
        },
        {
          isBackground: null,
          isLowConfidence: null,
          tag: {
            _id: 'id',
            issue: {
              _id: 'id',
              name: 'Environment',
            },
            name: 'Pro Nuclear Power',
          },
        },
        {
          isBackground: false,
          isLowConfidence: true,
          tag: {
            _id: 'id',
            issue: {
              _id: 'id',
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
