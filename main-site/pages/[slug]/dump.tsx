import groq from 'groq';
import { JsonView } from '~/components/JsonView';
import { factProjection } from '~/lib/groq/fact.projection';
import { sanityClient } from '~/shared/lib/sanityio';

export default function DumpPage(props: any) {
  return <JsonView src={props.facts} collapsed={100} />;
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const facts = await sanityClient.fetch(
    'dump',
    groq`
    *[_type == 'fact' && celeb->slug.current == $slug]{${factProjection}}
  `,
    { slug: params.slug },
  );

  return {
    props: {
      facts,
    },
  };
}

export { getStaticPaths } from '~/lib/getStatic/default.getStaticPaths';
