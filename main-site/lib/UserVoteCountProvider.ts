import { UserVote } from '~/lib/g/getUser.groq';
import { hvApiClient } from '~/lib/hvApiClient';
import { RequestBusStation } from '~/lib/RequestBusStation';

class UserVoteCountProvider {
  results: UserVote[] = [];

  requestBusStation = new RequestBusStation<string>(async () => {
    const counts = await hvApiClient<UserVote[]>(
      'get-anon-user-votes',
      // 'get-user-votes',
      // post({ factIds }),
    )!;

    if (counts) {
      this.results = counts;
    }
  });

  findUserVoteCount(factId: string) {
    return this.results.find((v) => v.factId === factId);
  }

  async get(factId: string) {
    await this.requestBusStation.trip(factId);

    const userVoteCount = this.findUserVoteCount(factId);

    return userVoteCount;
  }
}

export const userVoteCountProvider = new UserVoteCountProvider();
