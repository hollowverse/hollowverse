import React from 'react';
import { Fact } from '~/components/Fact';
import { useFact } from '~/components/hooks/useFact';
import { Celeb } from '~/lib/groq/celeb.partial.groq';
import { Fact as TFact } from '~/lib/groq/fact.partial.groq';

export function FactWithHook(props: {
  fact: TFact;
  celebName: string;
  linkSlug?: Celeb['slug'];
}) {
  const { ref, commentCount } = useFact(props.fact);

  return (
    <Fact
      celebName={props.celebName}
      ref={ref}
      linkSlug={props.linkSlug}
      commentCount={commentCount}
      value={props.fact}
    />
  );
}
