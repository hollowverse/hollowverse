import { Logtail as BrowserLogger } from '@logtail/browser';
import { Logtail as NodeLogger } from '@logtail/node';
import { isArray, noop } from 'lodash-es';
import { determineServerOrClient } from '~/lib/determineServerOrClient';
import { getNodeEnv } from '~/lib/getNodeEnv';
import { getVercelEnv } from '~/lib/getVercelEnv';

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

if (getVercelEnv() === 'development' || getNodeEnv() === 'development') {
  browserLogger.setSync(consoleLogger as any);
  nodeLogger.setSync(consoleLogger as any);
}

function getEnvShortName(longName: 'development' | 'production' | 'preview') {
  if (longName === 'development' || longName === 'preview') {
    return 'dev';
  }

  return 'prod';
}

type StringJson = {
  [name: string]: string | StringJson;
};

function createLogger(nodeLogger: NodeLogger, browserLogger: BrowserLogger) {
  return function (
    level: 'info' | 'error',
    message: string | Error,
    dimensions?: [string?, string?, string?],
    other?: StringJson,
  ) {
    const logger =
      determineServerOrClient() === 'server' ? nodeLogger : browserLogger;

    let dimObject: { [name: string]: string } = {};

    dimensions?.forEach((dim, i) => {
      if (dim) {
        dimObject['dim' + (i + 1)] = dim;
      }
    });

    return logger[level](message, {
      ...dimObject,
      env: getEnvShortName(getVercelEnv() || getNodeEnv()),
      branch: process.env.VERCEL_GIT_COMMIT_REF || 'unknown',
      ...other,
    });
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
