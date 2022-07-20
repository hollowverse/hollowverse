import groq from 'groq';
import {
  countBy,
  groupBy,
  mapValues,
  orderBy,
  toPairs,
  uniqBy,
} from 'lodash-es';
import { oneDay } from '~/lib/date';
import { Tag, tagProjection } from '~/lib/groq/tag.projection';
import { PageProps } from '~/shared/lib/types';
import { log } from '~/shared/lib/log';
import { sanityClient } from '~/shared/lib/sanityio';

export async function getLaunchPadTags() {
  const results = await sanityClient.fetch<Tag[]>(
    'launch-pad-page-data',
    groq`*[_type == 'tag']{${tagProjection}}`,
  )!;

  // get recurring top words
  const a = results.flatMap((t) => t.name.toLowerCase().split(' '));
  const b = countBy(a, (a) => a);
  const c = toPairs(b);
  const d = orderBy(c, (p) => p[1], 'desc');
  const topA = d.slice(0, Math.round(d.length * 0.05)); // get the top 3%
  const topB = topA.map((p) => p[0]);

  // remove top words from tags
  const a1 = results.map((t) => {
    const a = t.name.toLowerCase();
    const b = a
      .split(' ')
      .filter((w) => !topB.includes(w))
      .join(' ');
    return { name: b, issue: t.issue.name };
  });

  const a2 = uniqBy(a1, (t) => t.name).filter((w) => w.name);
  const b2 = groupBy(a2, (t) => t.issue);
  const c2 = mapValues(b2, (v) => orderBy(v, (t) => t.name, 'asc'));

  return c2;
}

export type LaunchPadPageProps = PageProps<typeof getStaticProps>;

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  log('info', `launchPad celeb getStaticProps called: ${params.slug}`);

  const celebName = await sanityClient.fetch<string>(
    'launch-pad-celeb',
    groq`*[_type == 'celeb' && slug.current == $slug][0]{name}.name`,
    { slug: params.slug },
  );

  if (!celebName) {
    return {
      notFound: true,
    };
  }

  const tags = await getLaunchPadTags()!;

  return {
    props: {
      celebName,
      pathname: `${params.slug}/lp`,
      tags,
    },

    revalidate: oneDay,
  };
};
