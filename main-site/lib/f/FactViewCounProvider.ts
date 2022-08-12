import QueryString from 'qs';
import { hvApiClient } from '~/lib/h/hvApiClient';
import { RequestBusStation } from '~/lib/r/RequestBusStation';

type ViewCount = { factId: string; viewCount: string };

class FactViewCountProvider {
  results: ViewCount[] = [];

  requestBusStation = new RequestBusStation<string>(async (factIds) => {
    // Sorting helps ensure similar calls get cached.
    factIds.sort();

    const q = QueryString.stringify({ factIds }, { encodeValuesOnly: true });

    const results = await hvApiClient<ViewCount[]>(
      `get-fact-view-counts?${q}`,
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
