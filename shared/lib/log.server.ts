import { isError } from 'lodash-es';
import { Context, logger } from './log';

function createTaskLogger(level: 'debug' | 'info') {
  return async function logTask<T extends any>(
    taskName: string,
    fn: (...args: any[]) => T,
    context?: Context,
  ): Promise<T | Error> {
    try {
      logger.debug(context, `ATTEMPTING: ${taskName}`);

      const results = await fn();

      logger[isError(results) ? 'error' : level](
        context,
        `${isError(results) ? 'FINISHED WITH ERRORS' : 'SUCCESS'}: ${taskName}`,
      );

      return results;
    } catch (e: any) {
      const _context = { ...context, ...e.context };
      logger.error(_context, `ERROR: ${taskName}`);
      logger.error(e);

      return e;
    }
  };
}

export const logTask = createTaskLogger('info');
export const logTaskD = createTaskLogger('debug');
