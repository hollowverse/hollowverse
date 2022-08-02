import { useEffect, useState } from 'react';
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from 'react-icons/fa';
import { FooterButton } from '~/components/FactFooter';
import { useIdentifyingCookie } from '~/components/hooks/useIdentifyingCookie';
import { redirectToLogin, useUser } from '~/components/hooks/useUser';
import { c } from '~/lib/c';
import { calculateVoteOperations } from '~/lib/calculateVoteOperations';
import { factVoteCountProvider } from '~/lib/FactVoteCountProvider';
import { Fact } from '~/lib/groq/fact.projection';
import { UserVote } from '~/lib/groq/getUser.groq';
import { hvApiClient, post } from '~/lib/hvApiClient';
import { userVoteCountProvider } from '~/lib/UserVoteCountProvider';
import { FactUserVote } from '~/pages/api/submit-vote';
import { log } from '~/shared/lib/log';

export function VoteButtons(props: { fact: Fact }) {
  const [choice, setChoice] = useState<'like' | 'dislike' | null>(null);
  const [working, setWorking] = useState(false);
  const [factVotes, setFactVotes] = useState<{
    likes: number;
    dislikes: number;
  }>({
    likes: 0,
    dislikes: 0,
  });

  const { isLoggedIn } = useUser();

  const tmpHvId = useIdentifyingCookie();

  useEffect(() => {
    async function req() {
      setWorking(true);

      const [factVotesRes, userVote] = await Promise.all([
        factVoteCountProvider.get(props.fact._id),
        isLoggedIn ? userVoteCountProvider.get(props.fact._id) : null,
      ]);

      if (factVotesRes) {
        setFactVotes(factVotesRes);
      }

      if (userVote) {
        setChoice(userVote.choice);
      }

      setWorking(false);
    }

    req();
  }, [isLoggedIn, props.fact._id]);

  return (
    <div className="flex gap-1">
      <FooterButton
        id="like-button"
        disabled={working}
        className={c('rounded-md bg-emerald-50 px-2', {
          'animate-pulse': working,
        })}
        onClick={getClickHandler('like')}
      >
        <span className="text-lg text-emerald-700">
          {choice === 'like' ? (
            <FaThumbsUp className="text-emerald-700" id="i-like" />
          ) : (
            <FaRegThumbsUp />
          )}
        </span>
        <p className="font-semibold text-emerald-700" id="like-count">
          {factVotes.likes ? factVotes.likes : 'Agree'}
        </p>
      </FooterButton>

      <FooterButton
        id="dislike-button"
        disabled={working}
        className={c('rounded-md bg-red-50 px-2', {
          'animate-pulse': working,
        })}
        onClick={getClickHandler('dislike')}
      >
        <span className="text-lg text-red-700">
          {choice === 'dislike' ? (
            <FaThumbsDown className="text-red-700" id="i-dislike" />
          ) : (
            <FaRegThumbsDown />
          )}
        </span>
        <p className="font-semibold text-red-700" id="dislike-count">
          {factVotes.dislikes ? factVotes.dislikes : 'Disagree'}
        </p>
      </FooterButton>
    </div>
  );

  function getClickHandler(handlerChoice: 'like' | 'dislike') {
    return async () => {
      setWorking(true);

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

      if (!isLoggedIn) {
        await log(
          'debug',
          `user vote; user ID ${tmpHvId}; fact ID ${props.fact._id}; choice: ${handlerChoice}`,
        );

        redirectToLogin(window.location.href);
        return;
      }

      const results = await hvApiClient<FactUserVote>(
        'submit-vote',
        post({ choice: handlerChoice, factId: props.fact._id }),
      );

      if (results) {
        const { likes, dislikes, choice: resChoice } = results;

        setFactVotes({ likes, dislikes });
        setChoice(resChoice);
      }

      setWorking(false);
    };
  }

  function vote(voteChoice: UserVote['choice']) {
    return { factId: props.fact._id, choice: voteChoice } as const;
  }
}
