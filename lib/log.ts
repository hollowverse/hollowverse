import { Browser as BrowserLogger, Node as NodeLogger } from '@logtail/js';
import { determineServerOrClient } from '~/lib/determineServerOrClient';
import { isArray } from 'lodash-es';
import { getEnvironment } from '~/lib/getNodeEnv';

interface ILogtailLog {
  dt: Date;
  level: string;
  message: string;
  [key: string]: any;
}

const sourceToken = 'pfNU5f3ybtYG51PNYR3an6Lb';

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

if (getEnvironment() !== 'production') {
  browserLogger.setSync(consoleLogger as any);
  nodeLogger.setSync(consoleLogger as any);
}

export function log() {
  if (determineServerOrClient() === 'server') {
    return nodeLogger;
  }

  return browserLogger;
}
