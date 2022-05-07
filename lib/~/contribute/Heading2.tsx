import React, { ReactElement } from 'react';

export const Heading2 = ({
  children,
  icon,
}: {
  children: string;
  icon: ReactElement;
}) => {
  return (
    <div>
      <div>{icon}</div>
      <div>
        <div>{children}</div>
      </div>
    </div>
  );
};
