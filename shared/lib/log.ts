import { Logtail as BrowserLogger } from '@logtail/browser';
import { Logtail as NodeLogger } from '@logtail/node';
import { Context as _Context } from '@logtail/types';
import { isArray, isError, noop } from 'lodash-es';
import { getEnv } from './getEnv';
import { determineServerOrClient } from './determineServerOrClient';
import { getNodeEnv } from './getNodeEnv';
import { getVercelEnv } from './getVercelEnv';

export type Context = _Context;

export function loggerStringify(obj: any) {
  const stringified = JSON.stringify(obj);

  // The brackets prevent Logtail from parsing of otherwise proper JSON strings
  return `<${stringified.substring(0, 50)}>`;
}

interface ILogtailLog {
  dt: Date;
  level: string;
  message: string;
  [key: string]: any;
}

const sourceToken = 'sESCAEUG8a8iEqMSJk1gJPZb';

const browserLogger = new BrowserLogger(sourceToken);
const nodeLogger = new NodeLogger(sourceToken);

function consoleLogger(logs: ILogtailLog[]) {
  isArray(logs) &&
    logs.forEach((l) => {
      const { level, message, dt, ...rest } = l;

      const logItem = `[${level}]: ${message}`;

      if (rest) {
        console.log(logItem, rest);
      } else {
        console.log(logItem);
      }
    });
}

function getEnvShortName(longName: 'development' | 'production' | 'preview') {
  if (longName === 'development' || longName === 'preview') {
    return 'dev';
  }

  return 'prod';
}

function createLogger(nodeLogger: NodeLogger, browserLogger: BrowserLogger) {
  return function (
    level: 'info' | 'error' | 'debug',
    message: string | Error,
    context?: Context,
  ) {
    const logger =
      determineServerOrClient() === 'server' ? nodeLogger : browserLogger;

    return logger[level](message, {
      env: getEnvShortName(getVercelEnv() || getNodeEnv()),
      commit: process.env.VERCEL_GIT_COMMIT_MESSAGE || 'unknown',
      ...context,
    });
  };
}

const dummyBrowserLogger = new BrowserLogger(sourceToken);
const dummyNodeLogger = new NodeLogger(sourceToken);
dummyBrowserLogger.setSync(noop as any);
dummyNodeLogger.setSync(noop as any);

if (getEnv() === 'development') {
  browserLogger.setSync(consoleLogger as any);
  nodeLogger.setSync(consoleLogger as any);
}

/**
 * Invert the comments below to silence the logs during development.
 * Use `flog` where you still need logs during development
 */
export const log = createLogger(nodeLogger, browserLogger);
// export const log = createLogger(dummyNodeLogger, dummyBrowserLogger);
// export const flog = createLogger(nodeLogger, browserLogger);

export function createContextLogger(context: Context) {
  return function contextLogger(...args: Parameters<typeof log>) {
    return log(args[0], args[1], {
      ...args[2],
      ...context,
    });
  };
}

export class LoggableError extends Error {
  context: Context;

  constructor(message: string, context: Context) {
    super(message);
    this.context = context;
  }
}

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
