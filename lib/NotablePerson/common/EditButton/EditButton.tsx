import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Button, CircularProgress } from '@mui/material';
import { constants } from '_l/constants';

export const getTypePlural = (type: string) => {
  return type === 'tag' ? 'tags' : 'categories';
};

export const EditButton = (p: any) => {
  return (
    <Button
      component="a"
      target="_blank"
      href={encodeURI(
        `https://discuss.hollowverse.com/new-topic?title=${p.data.name}: ${p.type} change suggestion&category=${p.type}-changes`,
      )}
      size="large"
      endIcon={
        <Image
          className="primaryBlueFilter"
          width={15}
          height={15}
          src="/images/icons/edit-regular.svg"
          alt="Edit "
        />
      }
    >
      Suggest changes to these {getTypePlural(p.type)}
    </Button>
  );
};
