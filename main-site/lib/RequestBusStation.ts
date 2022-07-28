/**
 * RequestBusStation
 *
 * It's a silly class name, but maybe it helps explain what this class does.
 *
 * In the UI, each Fact will want to request data specific to itself, like its view count,
 * vote count, etc. Each Fact can send its own HTTP request, but when you have a page with
 * 20 Facts, that means each page load will send 20 HTTP requests just for one piece of Fact data.
 *
 * That's like each Fact having a private car and driving to the same destination as any other Fact.
 * This class replaces the private car with a public bus transport, so to speak.
 *
 * Facts can now call the `trip` method to schedule themselves for the next bus trip. After 300ms
 * the bus will depart, taking with it all Facts that made it into this bus.
 *
 * See `FactVoteResultsProvider` for an example of how this class is used.
 */
export class RequestBusStation<T> {
  passengers: T[] = [];

  scheduledTrip: Promise<null> | null = null;

  constructor(public drive: (passengers: T[]) => any) {}

  async trip(passenger: T) {
    this.passengers.push(passenger);

    if (this.scheduledTrip) {
      return this.scheduledTrip;
    } else {
      this.scheduledTrip = new Promise((resolve) => {
        setTimeout(async () => {
          this.scheduledTrip = null;

          await this.drive(this.passengers);

          resolve(null);
        }, 300);
      });
    }

    return this.scheduledTrip;
  }
}
