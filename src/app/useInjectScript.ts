import { useEffect } from 'react';

export const useInjectScript = (src: string) => {
  useEffect(() => {
    let script = document.createElement('script');

    script.setAttribute('src', src);
    script.setAttribute('async', 'true');

    document.head.appendChild(script);
  }, []);
};
