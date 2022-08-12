import { DeepNonNullable } from 'utility-types';
import { FactVotes } from '~/lib/f/fact.projection';
import { hvApiClient, post } from '~/lib/h/hvApiClient';
import { RequestBusStation } from '~/lib/r/RequestBusStation';

export type NormalizedFactVotes = DeepNonNullable<FactVotes>;

class FactVoteCountProvider {
  results: NormalizedFactVotes[] = [];

  requestBusStation = new RequestBusStation<string>(async (factIds) => {
    const counts = await hvApiClient<NormalizedFactVotes[]>(
      'get-fact-votes',
      post({ factIds }),
    )!;

    if (counts) {
      this.results = counts;
    }
  });

  findFactVoteCount(factId: string) {
    return this.results.find((p) => p._id === factId);
  }

  async get(factId: string) {
    await this.requestBusStation.trip(factId);

    const factVoteCount = this.findFactVoteCount(factId);

    return factVoteCount;
  }
}

export const factVoteCountProvider = new FactVoteCountProvider();
