import { UserVote } from '~/lib/getUser.groq';
import { Nullish } from '~/shared/lib/types';

export function calculateVoteOperations(
  existingVote: Nullish<UserVote>,
  newVote: UserVote,
) {
  let operation: 'add' | 'remove' | 'replace' = 'add';
  let likes: number = 0;
  let dislikes: number = 0;

  if (existingVote && existingVote.factId === newVote.factId) {
    if (existingVote.choice === newVote.choice) {
      operation = 'remove';

      if (newVote.choice === 'like') {
        likes = -1;
      } else {
        dislikes = -1;
      }
    } else {
      operation = 'replace';

      if (newVote.choice === 'like') {
        likes = 1;
        dislikes = -1;
      } else {
        dislikes = 1;
        likes = -1;
      }
    }
  } else {
    operation = 'add';

    if (newVote.choice === 'like') {
      likes = 1;
      dislikes = 0;
    } else {
      dislikes = 1;
      likes = 0;
    }
  }

  return { operation, likes, dislikes };
}
