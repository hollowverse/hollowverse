import { useEffect, useState } from 'react';

export function useLocationHref() {
  const [href, setHref] = useState('');

  useEffect(() => {
    setHref(window.location.href);
  }, []);

  return href;
}
