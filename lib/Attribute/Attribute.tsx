import React from 'react';
import s from './attribute.module.scss';
import Image from 'next/image';

const iconLabelMap = [
  [['jewish'], 'menorah', 'Menorah'],
  [['catholic'], 'cross', 'Cross'],
  [['non-religious'], 'martini', 'Martini'],
  [['democrat', 'liberal', 'obama'], 'democrat', 'Donkey'],
  [['lgbt'], 'lgbt', 'LGBT'],
  [['actress', 'actor'], 'camera', 'Camera'],
  [['years old'], 'hourglass', 'Hourglass'],
  [['ancestry'], 'seedling', 'Seedling'],
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
    <li className={s.attribute}>
      <p>{p.label}</p>

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
    </li>
  );
};
