import React, { createContext, useContext } from 'react';
import { CelebPageProps } from '~/lib/pages/utils/types';

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
  return useContext<CelebPageProps>(StaticPropsContext as any);
};
