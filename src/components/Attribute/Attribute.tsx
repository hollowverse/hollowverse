import React from 'react';
import * as s from './attribute.module.scss';

import menorah from '../../images/icons/menorah.svg';
import cross from '../../images/icons/cross.svg';
import martini from '../../images/icons/martini.svg';
import democrat from '../../images/icons/democrat.svg';
import maleCouple from '../../images/icons/maleCouple.svg';

const iconLabelMap = [
  [['jewish'], menorah, 'Menorah'],
  [['catholic'], cross, 'Cross'],
  [['non-religious'], martini, 'Martini'],
  [['democrat', 'liberal', 'obama'], democrat, 'Donkey'],
  [['lgbt'], maleCouple, 'Male couple'],
];

export const Attribute: React.FC<{
  label: string;
}> = (p) => {
  let icon = null;
  const testLabel = p.label.toLowerCase();

  for (let i = 0; i < iconLabelMap.length; i++) {
    if (icon) break;

    for (let j = 0; j < iconLabelMap[i][0].length; j++) {
      if (icon) break;

      if (testLabel.includes(iconLabelMap[i][0][j])) {
        icon = iconLabelMap[i];
      }
    }
  }

  return (
    <div className={s.attribute}>
      <div>{p.label}</div>
      <div>{icon && <img className={s.img} src={icon[1]} alt={icon[2]} />}</div>
    </div>
  );
};
