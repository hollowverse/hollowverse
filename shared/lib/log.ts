import { Context as _Context } from '@logtail/types';
import pino from 'pino';
import { createPinoBrowserSend, createWriteStream } from 'pino-logflare';
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

export const logger = pino(
  {
    browser: {
      transmit: {
        send: send,
      },
    },
    level: 'debug',
  },
  stream,
).child({
  env: getEnvShortName(getVercelEnv() || getNodeEnv()),
  revision: process.env.VERCEL_GIT_COMMIT_MESSAGE || 'unknown',
});

export type Context = _Context;

export class LoggableError extends Error {
  context: Context;

  constructor(message: string, context: Context) {
    super(message);
    this.context = context;
  }
}
