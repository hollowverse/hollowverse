import { PropsWithChildren } from 'react';
import { Card2, CardProps } from '~/components/ui/Card2';
import React from 'react';
import {
  TitledContent,
  TitledContentProps,
} from '~/components/ui/TitledContent';

export function TitledCard(
  props: PropsWithChildren<{
    titledContentProps: TitledContentProps;
    cardProps?: CardProps;
  }>,
) {
  return (
    <TitledContent
      {...props.titledContentProps}
      title={<div className="px-5 py-4">{props.titledContentProps.title}</div>}
    >
      <Card2 topBorder={false} {...props.cardProps}>
        {props.children}
      </Card2>
    </TitledContent>
  );
}
