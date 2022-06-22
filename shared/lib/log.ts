import pino from 'pino';
import { createPinoBrowserSend, createWriteStream } from 'pino-logflare';
import { Json } from '~/lib/types';
import { getNodeEnv } from './getNodeEnv';
import { getVercelEnv } from './getVercelEnv';

// create pino-logflare stream
const stream = createWriteStream({
  apiKey: 'Pi1hh3av-9hc',
  sourceToken: 'a5992a80-fd2f-409f-b574-ebb388aac5ee',
});

// create pino-logflare browser stream
const send = createPinoBrowserSend({
  apiKey: 'Pi1hh3av-9hc',
  sourceToken: 'a5992a80-fd2f-409f-b574-ebb388aac5ee',
});

function getEnvShortName(longName: 'development' | 'production' | 'preview') {
  if (longName === 'development' || longName === 'preview') {
    return 'dev';
  }

  return 'prod';
}

const enableRemoteLogging = true;
// const enableRemoteLogging = false;

export const logger = pino(
  {
    browser: {
      transmit: enableRemoteLogging
        ? {
            send: send,
          }
        : undefined,
    },

    level: 'debug',
  },
  enableRemoteLogging ? stream : undefined,
).child(
  {
    env: getEnvShortName(getVercelEnv() || getNodeEnv()),
    revision: process.env.VERCEL_GIT_COMMIT_MESSAGE || 'unknown',
  },
  {
    serializers: {
      debugParams: (v) => JSON.stringify(v).replace(/"/g, "'"),
    },
  },
);

export class LoggableError extends Error {
  context: Json;

  constructor(message: string, context: Json) {
    super(message);
    this.context = context;
  }
}

export function mergeParams(v: Json | null | undefined, debugParams: Json) {
  if (v && v.debugParams) {
    return {
      ...v.debugParams,
      ...debugParams,
    };
  }

  return debugParams;
}
