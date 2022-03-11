import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import React from 'react';
import { useNotablePersonContext } from '../StaticPropsContextProvider';
import s from './AddFactButton.module.scss';

export const AddFactButton = () => {
  const context = useNotablePersonContext();
  const name = context.notablePersonYaml.name;

  const bodyContent = `Fill out the template below to submit a fact about the religion, political views or beliefs of ${name}:

**What did ${name} say or do?**

**What is the source for this information?**`;

  return (
    <div className={s.AddFactButton}>
      <Button
        variant="outlined"
        target="_blank"
        endIcon={<EditIcon />}
        href={`https://discuss.hollowverse.com/new-topic?title=${encodeURIComponent(
          name,
        )}&body=${encodeURIComponent(bodyContent)}&category=facts`}
      >
        Add info to this page
      </Button>
    </div>
  );
};
