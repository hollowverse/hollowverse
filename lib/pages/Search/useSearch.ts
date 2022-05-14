import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { fetchResults } from '~/lib/pages/Search/fetchResults';

export function useSearch() {
  const [loading, setLoading] = useState(false);
  const [isInternalNavigation, setInternalNavigation] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
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

    if (router.query.local === 'true') {
      setInternalNavigation(true);
    }

    router.replace(router.basePath, router.basePath, { shallow: true });

    runQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    goBack: router.back,
    isInternalNavigation,
    loading,
    searchResults: results,
  };
}
