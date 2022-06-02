import { Logtail as BrowserLogger } from '@logtail/browser';
import { Logtail as NodeLogger } from '@logtail/node';
import { determineServerOrClient } from '~/lib/determineServerOrClient';
import { isArray, noop } from 'lodash-es';
import { getEnvironment } from '~/lib/getNodeEnv';

interface ILogtailLog {
  dt: Date;
  level: string;
  message: string;
  [key: string]: any;
}

const sourceToken = 'PxGcePL5nLz1mXY8yvqKEf9P';

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

// const dummyBrowserLogger = new BrowserLogger(sourceToken);
// const dummyNodeLogger = new NodeLogger(sourceToken);
// dummyBrowserLogger.setSync(noop as any);
// dummyNodeLogger.setSync(noop as any);
// export function log(ifTrue?: boolean) {
//   if (ifTrue) {
//     if (determineServerOrClient() === 'server') {
//       return nodeLogger;
//     }

//     return browserLogger;
//   }

//   if (determineServerOrClient() === 'server') {
//     return dummyBrowserLogger;
//   }

//   return browserLogger;
// }
