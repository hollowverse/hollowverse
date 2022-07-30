import { DeepNonNullable } from 'utility-types';
import { FactVotes } from '~/lib/groq/fact.projection';
import { hvApiClient, post } from '~/lib/hvApiClient';
import { RequestBusStation } from '~/lib/RequestBusStation';

export type NormalizedFactVotes = DeepNonNullable<FactVotes>;

class FactVoteResultsProvider {
  results: NormalizedFactVotes[] = [];

  requestBusStation = new RequestBusStation<string>(async (factIds) => {
    const results = await hvApiClient<NormalizedFactVotes[]>(
      'fact-votes',
      post({ factIds }),
    )!;

    if (results) {
      this.results = results;
    }
  });

  findFactVoteResult(factId: string) {
    return this.results.find((p) => p._id === factId);
  }

  async get(factId: string) {
    await this.requestBusStation.trip(factId);

    const factVoteResult = this.findFactVoteResult(factId);

    return factVoteResult;
  }
}

export const factVoteResultsProvider = new FactVoteResultsProvider();
