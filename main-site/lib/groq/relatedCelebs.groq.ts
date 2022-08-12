import groq from 'groq';
import { Celeb, celebProjection } from '~/lib/c/celeb.projection';
import { Fact } from '~/lib/f/fact.projection';
import { celebTagProjection } from '~/lib/groq/tag.projection';

export type RelatedFact = Pick<Fact, 'date' | 'tags'>;

export type RelatedCeleb = Celeb & { facts: RelatedFact[] };

export type RelatedCelebsGroq = {
  byTag: RelatedCeleb[] | null;
  byIssue: RelatedCeleb[] | null;
};

export const relatedCelebsGroq = groq`{
  'byTag': *[
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
      ${celebTagProjection}
    }
  }[0...50] | order(tagFact.date desc),

  'byIssue': *[
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
      $issueId in tags[].tag->topic._ref
    ] | order(date desc) {
      ${celebTagProjection}
    }
  }[defined(facts[0])][0...50] | order(facts[0].date desc)
}`;
