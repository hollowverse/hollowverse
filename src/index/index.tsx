import { Container } from '@mui/material';
import React from 'react';
import { sanityClient } from '~/src/components/sanityio';
import s from './styles.module.scss';
import { top100CelebSlugs } from './top100CelebSlugs';

export const Index = (p) => {
  return (
    <Container className={s.Index} maxWidth="md">
      IM HOME!!!
    </Container>
  );
};

export const getStaticProps = async () => {
  const top100Celebs = await sanityClient.fetch(
    `*[_type == 'celeb' && slug.current in $slugs]{
      'slug': slug.current,
      'picture': picture.asset->{_id, 'metadata': {'lqip': metadata.lqip, 'palette': metadata.palette}}
    }`,
    { slugs: top100CelebSlugs },
  );

  return {
    props: {
      top100Celebs,
    },
  };
};
