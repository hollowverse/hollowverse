import { Container, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { NotablePersonProps } from 'pages/[notablePerson].page';
import s from './TopSection.module.scss';

export const TopSection = (p: NotablePersonProps) => (
  <Container maxWidth="md" style={{ padding: 0 }} className={s.TopSection}>
    <section className={s.fancyBackground}>
      <header className={s.header}>
        <div className={s.imageContainer}>
          <Image
            className={s.image}
            src={p.pic ? p.pic : '/images/avatar-placeholder.png'}
            width={200}
            height={250}
            priority
            alt={p.notablePersonYaml.name}
          />
        </div>

        <Typography variant="h1" className={s.title}>
          <span className={s.titleLessEmphasized}>
            Religion, politics, and ideas of
          </span>
          <br /> <span className={s.name}>{p.notablePersonYaml.name}</span>
        </Typography>
      </header>
    </section>
  </Container>
);
