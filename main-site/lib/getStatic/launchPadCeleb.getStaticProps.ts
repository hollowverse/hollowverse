import groq from 'groq';
import { uniq } from 'lodash-es';
import { oneDay } from '~/lib/date';
import { orderOfIssuesGroq } from '~/lib/groq/orderOfIssues.groq';
import { ResearcherLaunchPadProps } from '~/pages/[slug]/lp';
import { log } from '~/shared/lib/log';
import { sanityClient } from '~/shared/lib/sanityio';

export async function getLaunchPadIssues() {
  return uniq(
    await sanityClient.fetch(
      'launch-pad-page-data',
      groq`[...${orderOfIssuesGroq}, ...*[_type == 'topic']{name}.name]
  `,
    ),
  ) as string[];
}

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}): Promise<
  | { props: ResearcherLaunchPadProps; revalidate: number }
  | { notFound: boolean }
> => {
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

  const issues = await getLaunchPadIssues();

  return {
    props: {
      celebName,
      pathname: `${params.slug}/lp`,
      issues,
    },
    revalidate: oneDay,
  };
};
