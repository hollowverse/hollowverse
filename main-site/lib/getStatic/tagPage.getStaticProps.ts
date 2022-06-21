import groq from 'groq';
import { UnwrapPromise } from 'next/dist/lib/coalesced-function';
import { getCelebWithTimeline } from '~/lib/getStatic/getCelebWithTimeline';
import { TagTimeline } from '~/lib/getStatic/getTagTimeline';
import { log } from '~/shared/lib/log';
import { sanityClient } from '~/shared/lib/sanityio';

export type CelebPageProps = NonNullable<
  UnwrapPromise<ReturnType<typeof getStaticProps>>['props']
>;

function tagExists(tagTimeline: TagTimeline, tagId: string) {
  return tagTimeline.some((tpair) => tpair[1].some((t) => t.tag._id === tagId));
}

/**
 * For the celeb's tag page, we want to show the the celeb with the tag timeline
 * at the top.
 *
 * Below that we want to show all of the Facts that are tagged with this tag.
 *
 * Below that we want to get some more content to get the page to look more interesting.
 * So, in addition to the celeb's tag Facts, we want about 10 other Facts.
 *
 * We could show 10 Facts from other celebs with the same tag.
 *
 * If we can't find 10, we look for other celebs' takes on the issue of the Fact.
 */
export const getStaticProps = async ({
  params,
}: {
  params: { celeb: string; tagId: string };
}) => {
  log('info', `tagPage getStaticProps called: ${params.celeb}/${params.tagId}`);

  const results = await getCelebWithTimeline(params.celeb, true);

  if (!results) {
    return {
      notFound: true,
    };
  }

  if (!tagExists(results.celeb.tagTimeline, params.tagId)) {
    return {
      notFound: true,
    };
  }

  const tagFacts = results.celeb.facts.filter((f) =>
    f.tags.some((t) => t.tag._id === params.tagId),
  );

  const otherCelebsTagFacts = await sanityClient.fetch(
    'other-celebs-tag-facts',
    groq`*[
      _type == 'fact' &&
      celeb->slug.current != $celeb &&
      $tagId in tags[].tag->_id
    ][0...25] | order(date desc) {'name': celeb->name, date}`,
    params,
  );

  return {
    props: {
      celeb: results.celeb,
      tagFacts,
      otherCelebsTagFacts,
    },
  };
};
