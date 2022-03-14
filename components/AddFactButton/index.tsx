import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import React from 'react';
import { useNotablePersonContext } from '../StaticPropsContextProvider';
import s from './AddFactButton.module.scss';
import Link from 'next/link';

export const AddFactButton = () => {
  const context = useNotablePersonContext();
  const name = context.notablePersonYaml.name;
  const slug = context.slug;

  return (
    <div className={s.AddFactButton}>
      <Link
        href={{ pathname: '/~/contribute', query: { name, slug } }}
        passHref
      >
        <Button variant="outlined" endIcon={<EditIcon />}>
          Add info to this page
        </Button>
      </Link>
    </div>
  );
};
