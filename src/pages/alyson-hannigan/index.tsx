import React from 'react';
// @ts-ignore
import alysonHannigan from './pic.jpg';
// @ts-ignore
import alysonHanniganYml from './data.yml';
import NotablePerson from '../../components/NotablePerson/NotablePerson';
// @ts-ignore
import editorial from './editorial.md';

export default () => {
  return (
    <NotablePerson
      yml={alysonHanniganYml}
      pic={alysonHannigan}
      editorial={editorial}
    ></NotablePerson>
  );
};
