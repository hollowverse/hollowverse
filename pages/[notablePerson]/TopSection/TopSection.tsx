import { Container, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useNotablePersonContext } from '~/components/StaticPropsContextProvider';
import s from './TopSection.module.scss';

export const TopSection = () => {
  const context = useNotablePersonContext();

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
              alt={context.notablePersonYaml.name}
            />
          </div>

          <Typography variant="h1" className={s.title}>
            <span className={s.titleLessEmphasized}>
              Religion, politics, and ideas of
            </span>
            <br />{' '}
            <span className={s.name}>{context.notablePersonYaml.name}</span>
          </Typography>
        </header>
      </section>
    </div>
  );
};
