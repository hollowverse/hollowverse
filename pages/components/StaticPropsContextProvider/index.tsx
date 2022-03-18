import React, { createContext, useContext } from 'react';
import { CelebProps } from '~/pages/components/types';

const StaticPropsContext = createContext(null);

export const StaticPropsContextProvider = (props: any) => {
  const { value, children } = props;

  return (
    <StaticPropsContext.Provider value={value}>
      {children}
    </StaticPropsContext.Provider>
  );
};

export const useCelebContext = () => {
  return useContext<CelebProps>(StaticPropsContext as any);
};
