import React from 'react';

export function TestClientErrors() {
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          throw new Error('Sentry Frontend Error');
        }}
      >
        Throw error in onClick
      </button>

      <button
        type="button"
        onClick={async () => {
          const res = await fetch('https://example.com');
          const val = res.json() as any;

          console.log(val.hello.there);
        }}
      >
        Throw error in a promise
      </button>
    </div>
  );
}
