import groq from 'groq';
import { celebProjection } from '~/lib/groq/celeb.projection';
import { factProjection } from '~/lib/groq/fact.projection';

export const tagPageRelatedCelebsGroq = groq`{
  'withTag': *[
    _type == 'celeb' &&
    slug.current != $slug &&
    count(*[
      _type == 'fact' &&
      $tagId in tags[].tag._ref &&
      celeb._ref == ^._id
    ]) > 0
  ]{
    ${celebProjection},
    'facts': *[
      _type == 'fact' &&
      celeb._ref == ^._id &&
      $issueId in topics[]->name
    ]{
      ${factProjection}
    }
  },

  'withIssue': *[
    _type == 'celeb' &&
    slug.current != $slug
  ]{
    ${celebProjection},
    'facts': *[
      _type == 'fact' &&
      celeb._ref == ^._id &&
      $issueId in topics[]._ref &&
      !($tagId in tags[].tag._ref) // We don't want what's already been included in the "withTag" call
    ]{
      ${factProjection}
    }
  }[defined(facts[0])]
}`;
