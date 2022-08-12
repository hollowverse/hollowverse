import groq from 'groq';
import { JsonView } from '~/lib/j/JsonView';
import { Page } from '~/lib/p/Page';
import { oneMinute } from '~/lib/d/date';
import { Fact as TFact, factProjection } from '~/lib/f/fact.projection';
import { sanityClient } from '~/shared/lib/sanityio';
import { PageProps } from '~/shared/lib/types';

type DumpPageProps = PageProps<typeof getStaticProps>;

export default function DumpPage(props: DumpPageProps) {
  return (
    <Page
      allowSearchEngines={false}
      description="Dump"
      id="dump-page"
      pathname={`/${props.slug}/dump`}
      title="Dump"
      appBar={<div />}
    >
      <JsonView src={props.facts} collapsed={100} />
    </Page>
  );
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const facts = await sanityClient.fetch<TFact[]>(
    'dump',
    groq`
    *[_type == 'fact' && celeb->slug.current == $slug]{${factProjection}}
  `,
    { slug: params.slug },
  );

  return {
    props: {
      slug: params.slug,
      facts,
    },

    revalidate: oneMinute,
  };
}

export { getStaticPaths } from '~/lib/d/default.getStaticPaths';
