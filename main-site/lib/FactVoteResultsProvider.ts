import { RequestBusStation } from '~/lib/RequestBusStation';

class FactViewCountProvider {
  results: string[] = [];

  requestBusStation = new RequestBusStation<string>((factIds) => {
    this.results = factIds;
  });

  findFactViewCount(factId: string) {
    return this.results.find((p) => p === factId);
  }

  async get(factId: string) {
    await this.requestBusStation.trip(factId);

    const factViewCount = this.findFactViewCount(factId);

    return factViewCount;
  }
}

export const factViewCountProvider = new FactViewCountProvider();
