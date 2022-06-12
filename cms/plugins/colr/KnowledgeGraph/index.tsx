import React, { useState } from 'react';
import { Card } from './Card';
import { kgCall } from './kgCall';
import { sort } from './sort';

export function KnowledgeGraph() {
  const [value, setValue] = useState('');
  const [results, setResults] = useState<any>(null);

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        onKeyDown={async (e) => {
          if (e.key === 'Enter') {
            const results = await kgCall(value);

            setResults(sort(value, (await results.json()).itemListElement));
          }
        }}
        type="text"
        placeholder="Search for a celebrity name"
      ></input>

      {results &&
        results.map((item) => (
          <Card key={item.result['@id']} {...item.result} />
        ))}
    </div>
  );
}
