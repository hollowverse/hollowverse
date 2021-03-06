import { EventEmitter } from 'events';
import { once } from 'lodash';

export type Cancelable<T> = Readonly<{
  promise: Promise<T>;
  wasCanceled: boolean;
  cancel(message?: string): void;
}>;

class CancelationError extends Error {
  name = 'CancelationError';

  constructor(message?: string) {
    super(message);
    if (message) {
      this.message = message;
    }
  }
}

export function promiseToCancelable<T>(promise: Promise<T>): Cancelable<T> {
  let wasCanceled = false;

  const target = new EventEmitter();

  const cancelationPromise = new Promise<T>((_, reject) => {
    target.addListener('cancel', reason => {
      wasCanceled = true;
      reject(new CancelationError(reason));
    });
  });

  const removeListeners = () => {
    target.removeAllListeners();
  };

  const wrappedPromise = Promise.race([cancelationPromise, promise]).finally(
    removeListeners,
  );

  return {
    promise: wrappedPromise,
    get wasCanceled() {
      return wasCanceled;
    },
    cancel: once((reason?: string) => {
      target.emit('cancel', reason);
    }),
  };
}

export function isCancelRejection(obj: unknown): obj is CancelationError {
  return obj instanceof CancelationError;
}

export const ignoreCancelRejections = async (error: unknown) => {
  if (!isCancelRejection(error)) {
    throw error;
  }
};
