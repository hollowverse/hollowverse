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
    <div className="flex">
      <FooterButton
        id="like-button"
        disabled={working}
        className={c({ 'animate-pulse': working })}
        onClick={getClickHandler('like')}
      >
        <span className="text-lg">
          {choice === 'like' ? (
            <FaThumbsUp className="text-purple-500" id="i-like" />
          ) : (
            <FaRegThumbsUp />
          )}
        </span>
        <p className="font-semibold" id="like-count">
          {factVotes.likes ? factVotes.likes : 'Like'}
        </p>
      </FooterButton>

      <FooterButton
        id="dislike-button"
        disabled={working}
        className={c({ 'animate-pulse': working })}
        onClick={getClickHandler('dislike')}
      >
        <span className="text-lg">
          {choice === 'dislike' ? (
            <FaThumbsDown className="text-orange-600" id="i-dislike" />
          ) : (
            <FaRegThumbsDown />
          )}
        </span>
        <p className="font-semibold" id="dislike-count">
          {factVotes.dislikes ? factVotes.dislikes : 'Dislike'}
        </p>
      </FooterButton>
    </div>
  );

  function getClickHandler(handlerChoice: 'like' | 'dislike') {
    return async () => {
      setWorking(true);

      await log(
        'debug',
        `user vote; user ID ${tmpHvId}; fact ID ${props.fact._id}; choice: ${handlerChoice}`,
      );

      if (!isLoggedIn) {
        redirectToLogin(window.location.href);
        return;
      }

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
