import groq from 'groq';
import { sanityClient } from '~/shared/lib/sanityio';

export async function getStaticProps({
  params,
}: {
  params: { issueId: string };
}) {
  const facts = await sanityClient.fetch(
    'issue-page-facts',
    groq`
      *[_type == 'fact' && $issueId in topics[]._ref][0]
    `,
    { issueId: params.issueId },
  );

  return {
    props: {
      facts,
      issueId: params.issueId,
    },
  };
}
