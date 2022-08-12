import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Spinner } from '~/lib/Spinner';
import { c } from '~/lib/c';

export function PageTransitionSpinner() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (loading) {
      timeout = setTimeout(() => {
        setShowSpinner(true);
      }, 500);
    } else {
      timeout && clearTimeout(timeout);
      setShowSpinner(false);
    }
  }, [loading]);

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
    <div
      className={c(
        'fixed inset-0 z-40 flex items-center justify-center overflow-hidden',
        {
          'h-full': loading,
          'h-0': !loading,
        },
      )}
    >
      <div
        className={c('absolute inset-0 bg-white transition-opacity', {
          'opacity-0': !loading,
          'opacity-70': loading,
        })}
      />
      <Spinner
        className={c('text-[6rem] transition-opacity duration-700', {
          'opacity-0': !showSpinner,
          'opacity-80': showSpinner,
        })}
      />
    </div>
  );
}
