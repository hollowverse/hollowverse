import React, { createContext, useContext } from 'react';
import { NotablePersonProps } from '~/pages/common/types';

const StaticPropsContext = createContext(null);

export const StaticPropsContextProvider = (props: any) => {
  const { value, children } = props;

  return (
    <StaticPropsContext.Provider value={value}>
      {children}
    </StaticPropsContext.Provider>
  );
};

export const useNotablePersonContext = () => {
  return useContext<NotablePersonProps>(StaticPropsContext as any);
};
