import { UserVote } from '~/lib/groq/getUser.groq';
import { hvApiClient, post } from '~/lib/hvApiClient';
import { RequestBusStation } from '~/lib/RequestBusStation';

class UserVoteResultsProvider {
  results: UserVote[] = [];

  requestBusStation = new RequestBusStation<string>(async (factIds) => {
    const results = await hvApiClient<UserVote[]>(
      'get-user-votes',
      post({ factIds }),
    )!;

    if (results) {
      this.results = results;
    }
  });

  findUserVoteResult(factId: string) {
    return this.results.find((v) => v.factId === factId);
  }

  async get(factId: string) {
    await this.requestBusStation.trip(factId);

    const userVoteResult = this.findUserVoteResult(factId);

    return userVoteResult;
  }
}

export const userVoteResultsProvider = new UserVoteResultsProvider();
