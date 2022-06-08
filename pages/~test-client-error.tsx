import React from 'react';
import { NextApiClient } from '~/lib/NextApiClient';

export default function TestClientErrors() {
  return (
    <div>
      <div>
        <button
          type="button"
          onClick={() => {
            throw new Error('Sentry Frontend Error');
          }}
        >
          Throw error in onClick
        </button>
      </div>

      <div style={{ marginTop: 30 }}>
        <button
          type="button"
          onClick={async () => {
            const res = await NextApiClient('https://example.com');
            const val = res.json() as any;

            console.log(val.hello.there);
          }}
        >
          Throw error in a promise
        </button>
      </div>
    </div>
  );
}
