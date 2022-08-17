import { useEffect, useState } from 'react';
import { default as useLocalStorage_ } from '@rehooks/local-storage';

export function useLocalStorage<T extends any>(
  name: string,
  initialValue: any,
) {
  const [val, setVal] = useLocalStorage_<T>(name, initialValue);
  const [stateVal, setStateVal] = useState<T>(initialValue);

  useEffect(() => {
    setStateVal(val);
  }, [setVal, val]);

  return [
    stateVal,
    (val_: T) => {
      setVal(val_);
      setStateVal(val_);
    },
  ] as const;
}
