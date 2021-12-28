import { Button } from '@mui/material';
import React from 'react';
import EditRegularSvg from 'public/images/icons/edit-regular.svg';
import { Icon } from 'pages/common/Icon';

export const getTypePlural = (type: string) => {
  return type === 'tag' ? 'tags' : 'quotes';
};

export const EditButton = (p: any) => {
  return (
    <Button
      component="a"
      target="_blank"
      rel="noopener"
      href={encodeURI(
        `https://discuss.hollowverse.com/new-topic?title=${p.data.name}: ${p.type} change suggestion&category=${p.type}-changes`,
      )}
      size="large"
      endIcon={
        <Icon width={10} height={10} component={EditRegularSvg as any} />
      }
    >
      Suggest changes to these {getTypePlural(p.type)}
    </Button>
  );
};
