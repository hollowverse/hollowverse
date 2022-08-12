import groq from 'groq';

export type UserVote = {
  factId: string;
  choice: 'like' | 'dislike';
};

export type User = {
  _id: string;
  votes: UserVote[];
};

export function getUserGroq(userId: string) {
  return [
    groq`*[_type == 'user' && _id == $userId][0]{
      _id,
      votes
    }`,
    { userId },
  ] as const;
}
