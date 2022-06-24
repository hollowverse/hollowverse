import groq from 'groq';
import { Celeb, celebProjection } from '~/lib/groq/celeb.projection';
import { Fact, factProjection } from '~/lib/groq/fact.projection';

export type TagPageRelatedCelebsGroq = {
  withTag: Celeb[] | null;
  withIssue: (Celeb & { facts: Fact[] })[] | null;
};

export const tagPageRelatedCelebsGroq = groq`{
  'withTag': *[
    _type == 'celeb' &&
    count(*[
      _type == 'fact' &&
      $tagId in tags[].tag._ref &&
      celeb._ref == ^._id
    ]) > 0
  ]{
    ${celebProjection},
    'fact': *[
      _type == 'fact' &&
      celeb._ref == ^._id &&
      $tagId in tags[].tag._ref
    ]{date} | order(date desc)[0]
  }[0...50] | order(fact.date desc),

  'withIssue': *[
    _type == 'celeb' &&
    count(*[
      _type == 'fact' &&
      celeb._ref == ^._id &&
      $tagId in tags[].tag._ref // We don't want what's already been included in the "withTag" call
    ]) == 0
  ]{
    ${celebProjection},
    'facts': *[
      _type == 'fact' &&
      celeb._ref == ^._id &&
      $issueId in topics[]._ref
    ] | order(date desc) {
      ${factProjection}
    }
  }[defined(facts[0])][0...50] | order(facts[0].date desc)
}`;
