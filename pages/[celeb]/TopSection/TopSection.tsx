import { Container, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useCelebContext } from '~/pages/components/StaticPropsContextProvider';
import s from './TopSection.module.scss';

export const TopSection = () => {
  const context = useCelebContext();

  return (
    <div className={s.TopSection}>
      <section className={s.fancyBackground}>
        <header className={s.header}>
          <div className={s.imageContainer}>
            <Image
              className={s.image}
              src={context.pic ? context.pic : '/images/avatar-placeholder.png'}
              width={200}
              height={250}
              priority
              alt={context.celeb.name}
            />
          </div>

          <Typography variant="h1" className={s.title}>
            <span className={s.titleLessEmphasized}>
              Religion, politics, and ideas of
            </span>
            <br /> <span className={s.name}>{context.celeb.name}</span>
          </Typography>
        </header>
      </section>
    </div>
  );
};
