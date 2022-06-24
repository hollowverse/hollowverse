import groq from 'groq';
import { Celeb, celebProjection } from '~/lib/groq/celeb.projection';
import { Fact } from '~/lib/groq/fact.projection';
import { tagProjection } from '~/lib/groq/tag.projection';

export type TagPageRelatedFact = Pick<Fact, 'date' | 'tags'>;

export type TagPageRelatedCeleb = Celeb & { facts: TagPageRelatedFact[] };

export type TagPageRelatedCelebsGroq = {
  withTag: TagPageRelatedCeleb[] | null;
  withIssue: TagPageRelatedCeleb[] | null;
};

export const tagPageRelatedCelebsGroq = groq`{
  'withTag': *[
    _type == 'celeb' &&

    // only celebs that have the tag
    count(*[
      _type == 'fact' &&
      $tagId in tags[].tag._ref &&
      celeb._ref == ^._id
    ]) > 0
  ]{
    ${celebProjection},

    // we create this key in the projection in order to sort by it, only
    'tagFact': *[
      _type == 'fact' &&
      celeb._ref == ^._id &&
      $tagId in tags[].tag._ref
    ]{date} | order(date desc)[0],

    'facts': *[
      _type == 'fact' &&
      celeb._ref == ^._id
    ]{
      ${tagProjection}
    }
  }[0...50] | order(tagFact.date desc),

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
      ${tagProjection}
    }
  }[defined(facts[0])][0...50] | order(facts[0].date desc)
}`;
