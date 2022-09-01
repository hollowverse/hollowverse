import { Logtail as BrowserLogger } from '@logtail/browser';
import { Logtail as NodeLogger } from '@logtail/node';
import { Context as _Context } from '@logtail/types';
import { isArray, noop } from 'lodash-es';
import { determineServerOrClient } from './determineServerOrClient';
import { getNodeEnv } from './getNodeEnv';
import { getVercelEnv } from './getVercelEnv';

export type Context = _Context;

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
    try {
      const logger =
        determineServerOrClient() === 'server' ? nodeLogger : browserLogger;

      return logger[level](message, {
        env: getEnvShortName(getVercelEnv() || getNodeEnv()),
        commit: process.env.VERCEL_GIT_COMMIT_MESSAGE || 'unknown',
        ...context,
      });
    } catch (e) {
      return null;
    }
  };
}

const dummyBrowserLogger = new BrowserLogger(sourceToken);
const dummyNodeLogger = new NodeLogger(sourceToken);
dummyBrowserLogger.setSync(noop as any);
dummyNodeLogger.setSync(noop as any);

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
