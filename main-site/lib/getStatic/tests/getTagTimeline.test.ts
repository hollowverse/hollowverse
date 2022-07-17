import { sortTags } from '~/lib/getStatic/helpers/sortTags';
import { mockOrderOfIssues } from '~/lib/getStatic/tests/mockOrderOfIssues';

test('sortTags to remove dupes', () => {
  expect(
    sortTags(
      [
        {
          isBackground: null,
          isLowConfidence: null,
          tag: {
            isVerb: true,
            _id: 'id',
            issue: { isAffiliation: true, _id: 'id', name: 'Environment' },
            name: 'Environmentalist',
          },
        },
        {
          isBackground: null,
          isLowConfidence: null,
          tag: {
            isVerb: true,
            _id: 'id',
            issue: { isAffiliation: true, _id: 'id', name: 'Environment' },
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
            isVerb: true,
            _id: 'id',
            issue: { isAffiliation: true, _id: 'id', name: 'Environment' },
            name: 'Environmentalist',
          },
        },
        {
          isBackground: null,
          isLowConfidence: null,
          tag: {
            isVerb: true,
            _id: 'id',
            issue: { isAffiliation: true, _id: 'id', name: 'Environment' },
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
            isVerb: true,
            _id: 'id',
            issue: { isAffiliation: true, _id: 'id', name: 'Environment' },
            name: 'Environmentalist',
          },
        },
        {
          isBackground: null,
          isLowConfidence: true,
          tag: {
            isVerb: true,
            _id: 'id',
            issue: { isAffiliation: true, _id: 'id', name: 'Environment' },
            name: 'Environmentalist',
          },
        },

        {
          isBackground: null,
          isLowConfidence: true,
          tag: {
            isVerb: true,
            _id: 'id',
            issue: { isAffiliation: true, _id: 'id', name: 'Environment' },
            name: 'Environmentalist',
          },
        },
        {
          isBackground: null,
          isLowConfidence: true,
          tag: {
            isVerb: true,
            _id: 'id',
            issue: { isAffiliation: true, _id: 'id', name: 'Environment' },
            name: 'foobar',
          },
        },
        {
          isBackground: null,
          isLowConfidence: null,
          tag: {
            isVerb: true,
            _id: 'id',
            issue: { isAffiliation: true, _id: 'id', name: 'Environment' },
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
            isVerb: true,
            _id: 'id',
            issue: { isAffiliation: true, _id: 'id', name: 'LGBT' },
            name: 'Supports LGBT',
          },
        },
        {
          isBackground: null,
          isLowConfidence: null,
          tag: {
            isVerb: true,
            _id: 'id',
            issue: { isAffiliation: true, _id: 'id', name: 'Environment' },
            name: 'Pro Nuclear Power',
          },
        },
        {
          isBackground: false,
          isLowConfidence: true,
          tag: {
            isVerb: true,
            _id: 'id',
            issue: { isAffiliation: true, _id: 'id', name: 'Religion' },
            name: 'Not Religious',
          },
        },
      ],
      mockOrderOfIssues,
    ),
  ).toMatchSnapshot();
});
