import { v4 as uuid } from 'uuid';
import React from 'react';

export function Uuid() {
  return <div>{uuid()}</div>;
}
