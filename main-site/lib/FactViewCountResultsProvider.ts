import { hvApiClient, post } from '~/lib/hvApiClient';
import { RequestBusStation } from '~/lib/RequestBusStation';

type ViewCount = { factId: string; viewCount: string };

class FactViewCountResultsProvider {
  results: ViewCount[] = [];

  requestBusStation = new RequestBusStation<string>(async (factIds) => {
    // Sorting helps ensure similar calls get cached.
    factIds.sort();

    const results = await hvApiClient<ViewCount[]>(
      'get-fact-view-counts',
      post({ factIds }),
    )!;

    if (results) {
      this.results = results;
    }
  });

  findFactViewCountResult(factId: string) {
    return this.results.find((v) => v.factId === factId);
  }

  async get(factId: string) {
    await this.requestBusStation.trip(factId);

    const factViewCountResult = this.findFactViewCountResult(factId);

    return factViewCountResult?.viewCount;
  }
}

export const factViewCountResultsProvider = new FactViewCountResultsProvider();
