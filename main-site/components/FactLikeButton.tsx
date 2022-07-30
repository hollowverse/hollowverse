import { useEffect, useState } from 'react';
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from 'react-icons/fa';
import { calculateVoteOperations } from '~/lib/calculateVoteOperations';
import { factVoteResultsProvider } from '~/lib/FactVoteResultsProvider';
import { Fact, FactVotes } from '~/lib/groq/fact.projection';
import { UserVote } from '~/lib/groq/getUser.groq';
import { hvApiClient, post } from '~/lib/hvApiClient';
import { FactUserVote } from '~/pages/api/vote';

export function FactLikeButton(props: { fact: Fact }) {
  const [choice, setChoice] = useState<'like' | 'dislike' | null>(null);
  const [factVotes, setFactVotes] = useState<{
    likes: number;
    dislikes: number;
  }>({
    likes: 0,
    dislikes: 0,
  });

  useEffect(() => {
    async function req() {
      const factVotesRes = await factVoteResultsProvider.get(props.fact._id);

      if (factVotesRes) {
        setFactVotes(factVotesRes);
      }
    }
    req();
  }, []);

  return (
    <div className="flex gap-7">
      <button
        onClick={getClickHandler('like')}
        className="flex flex-col items-center gap-0.5"
      >
        <span className="text-xl">
          {choice === 'like' ? <FaThumbsUp /> : <FaRegThumbsUp />}
        </span>
        <p className="font-semibold">
          {factVotes.likes ? factVotes.likes : 'Like'}
        </p>
      </button>

      <button
        className="flex flex-col items-center gap-0.5"
        onClick={getClickHandler('dislike')}
      >
        <span className="text-xl">
          {choice === 'dislike' ? <FaThumbsDown /> : <FaRegThumbsDown />}
        </span>
        <p className="font-semibold">
          {factVotes.dislikes ? factVotes.dislikes : 'Dislike'}
        </p>
      </button>
    </div>
  );

  function getClickHandler(handlerChoice: 'like' | 'dislike') {
    return async () => {
      const op = calculateVoteOperations(
        choice && vote(choice),
        vote(handlerChoice),
      );

      setChoice(
        op.operation === 'add' || op.operation === 'replace'
          ? handlerChoice
          : null,
      );
      setFactVotes({
        likes: factVotes.likes + op.likes,
        dislikes: factVotes.dislikes + op.dislikes,
      });

      const results = await hvApiClient<FactUserVote>(
        'vote',
        post({ choice: handlerChoice, factId: props.fact._id }),
      );

      if (results) {
        const { likes, dislikes, choice: resChoice } = results;

        setFactVotes({ likes, dislikes });
        setChoice(resChoice);
      }
    };
  }

  function vote(voteChoice: UserVote['choice']) {
    return { factId: props.fact._id, choice: voteChoice } as const;
  }
}
