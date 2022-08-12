import { PropsWithChildren } from 'react';
import { Card, CardProps } from '~/components/c/Card';
import {
  TitledContent,
  TitledContentProps,
} from '~/components/t/TitledContent';

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
      <Card topBorder={false} {...props.cardProps}>
        {props.children}
      </Card>
    </TitledContent>
  );
}
