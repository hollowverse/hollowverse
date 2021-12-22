import React from 'react';
import s from './tag.module.scss';
import Image from 'next/image';

export const Attribute: React.FC<{
  text: string;
  icon: string;
  alt: string;
}> = (p) => {
  return (
    <li className={s.tag}>
      <div>{p.text}</div>

      <div className={s.img}>
        <Image
          width={20}
          height={20}
          src={`/images/icons/${p.icon}.svg`}
          alt={p.alt}
        />
      </div>
    </li>
  );
};
