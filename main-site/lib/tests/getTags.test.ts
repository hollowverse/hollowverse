import { Fact, Tag } from '~/lib/groq/fact.partial.groq';
import { copyFacts, factsDataTransform } from '~/lib/factsDataTransform';
import { mockOrderOfIssues } from '~/lib/tests/mockOrderOfIssues';
import { sortTags } from '~/lib/getTags';

test('sortTags to remove dupes', () => {
  expect(
    sortTags(
      [
        {
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
