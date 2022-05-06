import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';



//removemui


export const Icon = <C extends React.ElementType>(
  props: SvgIconProps<C, { component?: C }>,
) => {
  return <SvgIcon viewBox="0 0 600 476.6" {...props} />;
};
