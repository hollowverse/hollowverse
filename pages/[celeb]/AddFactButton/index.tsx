import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import React from 'react';
import { useCelebContext } from '~/pages/components/StaticPropsContextProvider';
import s from './styles.module.scss';
import { getContributeLink } from '~/pages/components/getContributeLink';
import { useRouter } from 'next/router';

export const AddFactButton = () => {
  const context = useCelebContext();
  const router = useRouter();
  const name = context.celebYaml.name;
  const slug = context.slug;

  return (
    <div className={s.AddFactButton}>
      <Button
        variant="outlined"
        endIcon={<EditIcon />}
        onClick={() => {
          const hasReadInstructions = JSON.parse(
            localStorage.getItem('hasReadInstructions') || 'false',
          );

          router.push(
            hasReadInstructions
              ? getContributeLink(name)
              : { pathname: '/~/contribute', query: { name, slug } },
          );
        }}
      >
        Add a Fact
      </Button>
    </div>
  );
};
