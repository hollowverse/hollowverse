import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Spinner } from '~/components/Spinner';

export function PageTransitionSpinner() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  return (
    (loading && (
      <div className="fixed bottom-5 right-5">
        <Spinner />
      </div>
    )) ||
    null
  );
}
