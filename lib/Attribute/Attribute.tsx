import React from 'react';
import s from './attribute.module.scss';
import Image from 'next/image';

import menorah from '_i/icons/menorah.svg';
import cross from '_i/icons/cross.svg';
import martini from '_i/icons/martini.svg';
import democrat from '_i/icons/democrat.svg';
import lgbt from '_i/icons/lgbt.svg';
import hourglass from '_i/icons/hourglass.svg';
import camera from '_i/icons/camera.svg';
import flag from '_i/icons/flag.svg';

const iconLabelMap = [
  [['jewish'], 'menorah', 'Menorah'],
  [['catholic'], 'cross', 'Cross'],
  [['non-religious'], 'martini', 'Martini'],
  [['democrat', 'liberal', 'obama'], 'democrat', 'Donkey'],
  [['lgbt'], 'lgbt', 'LGBT'],
  [['actress', 'actor'], 'camera', 'Camera'],
  [['years old'], 'hourglass', 'Hourglass'],
  [['ancestry'], 'flag', 'Flag'],
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
      <div className={s.img}>
        {icon && (
          <Image
            width={20}
            height={20}
            src={`/images/icons/${icon[1]}.svg`}
            alt={icon[2] as string}
          />
        )}
      </div>
    </div>
  );
};
