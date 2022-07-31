import { hvApiClient, post } from '~/lib/hvApiClient';
import { RequestBusStation } from '~/lib/RequestBusStation';

type ViewCount = { factId: string; viewCount: string };

class FactViewCountProvider {
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

  findFactViewCount(factId: string) {
    return this.results.find((v) => v.factId === factId);
  }

  async get(factId: string) {
    await this.requestBusStation.trip(factId);

    const factViewCount = this.findFactViewCount(factId);

    return factViewCount?.viewCount;
  }
}

export const factViewCountProvider = new FactViewCountProvider();
