import React, { ReactElement } from 'react';

export const Heading2 = ({
  children,
  icon,
}: {
  children: string;
  icon: ReactElement;
}) => {
  return (
    <div className="">
      <div>{icon}</div>
      <div className="">
        <div>{children}</div>
      </div>
    </div>
  );
};
