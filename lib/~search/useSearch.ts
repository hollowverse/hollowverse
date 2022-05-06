import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { fetchResults } from '~/lib/~search/fetchResults';

export function useSearch() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const { previousUrl } = useRouter().query;

  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    inputRef?.current?.focus();
  }, []);

  useEffect(() => {
    async function runQuery() {
      if (query) {
        setLoading(true);
        setResults(null);

        const response = await fetchResults(query);

        setResults(response);
        setLoading(false);
      }
    }

    runQuery();
  }, [query]);

  return {
    query,
    inputRef,
    onQueryChange: async (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    onClearResultsClick: () => {
      setQuery('');
      setResults(null);
    },
    previousUrl,
    loading,
    searchResults: results,
  };
}
