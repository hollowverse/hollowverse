import { isError } from 'lodash-es';
import { Context, log } from './log';

function createTaskLogger(level: 'debug' | 'info') {
  return async function logTask<T extends any>(
    taskName: string,
    fn: (...args: any[]) => T,
    context?: Context,
  ): Promise<T | Error> {
    try {
      log('debug', `ATTEMPTING: ${taskName}`, context);

      const results = await fn();

      log(
        isError(results) ? 'error' : level,
        `${isError(results) ? 'FINISHED WITH ERRORS' : 'SUCCESS'}: ${taskName}`,
        context,
      );

      return results;
    } catch (e: any) {
      const _context = { ...context, ...e.context };
      log('error', `ERROR: ${taskName}`, _context);
      log('error', e, _context);

      return e;
    }
  };
}

export const logTask = createTaskLogger('info');
export const logTaskD = createTaskLogger('debug');
