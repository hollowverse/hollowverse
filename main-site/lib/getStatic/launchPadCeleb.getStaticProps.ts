import groq from 'groq';
import { uniq } from 'lodash-es';
import { logger } from '~/shared/lib/log';
import { sanityClient } from '~/shared/lib/sanityio';
import { ResearcherLaunchPadProps } from '~/pages/[celeb]/lp';

export async function getLaunchPadIssues() {
  return uniq(
    await sanityClient.fetch(
      'launch-pad-page-data',
      groq`[...*[_type == 'orderOfTopics'][0]{'issues': topics[]->name}.issues, ...*[_type == 'topic']{name}.name]
  `,
    ),
  ) as string[];
}

export const getStaticProps = async ({
  params,
}: {
  params: { celeb: string };
}): Promise<{ props: ResearcherLaunchPadProps } | { notFound: boolean }> => {
  logger.info(`launchPad celeb getStaticProps called: ${params.celeb}`);

  const celebName = await sanityClient.fetch<string>(
    'launch-pad-celeb',
    groq`*[_type == 'celeb' && slug.current == $slug][0]{name}.name`,
    { slug: params.celeb },
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
      pathname: `${params.celeb}/lp`,
      issues,
    },
  };
};
