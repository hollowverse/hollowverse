import useSWR from 'swr';
import { Json } from '~/shared/lib/types';

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function useHvApi<T extends Json | null>(api: string) {
  const results = useSWR<T | null>(`/api/${api}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return results;
}
