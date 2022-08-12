import { calculateVoteOperations } from '~/lib/c/calculateVoteOperations';

function vote(choice: 'like' | 'dislike') {
  return { factId: '1', choice };
}

test('from like to like', () => {
  expect(calculateVoteOperations(vote('like'), vote('like'))).toEqual({
    operation: 'remove',
    likes: -1,
    dislikes: 0,
  });
});

test('from dislike to dislike', () => {
  expect(calculateVoteOperations(vote('like'), vote('like'))).toEqual({
    operation: 'remove',
    likes: -1,
    dislikes: 0,
  });
});

test('from like to dislike', () => {
  expect(calculateVoteOperations(vote('like'), vote('dislike'))).toEqual({
    operation: 'replace',
    likes: -1,
    dislikes: 1,
  });
});

test('from dislike to like', () => {
  expect(calculateVoteOperations(vote('dislike'), vote('like'))).toEqual({
    operation: 'replace',
    likes: 1,
    dislikes: -1,
  });
});

test('from nothing to like', () => {
  expect(calculateVoteOperations(null, vote('like'))).toEqual({
    operation: 'add',
    likes: 1,
    dislikes: 0,
  });
});

test('from nothing to dislike', () => {
  expect(calculateVoteOperations(null, vote('dislike'))).toEqual({
    operation: 'add',
    likes: 0,
    dislikes: 1,
  });
});
