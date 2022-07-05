import groq from 'groq';
import { CelebImage } from '~/components/CelebImage';
import { Fact } from '~/components/Fact';
import { Page } from '~/components/Page';
import { TitledCard } from '~/components/ui/TitledCard';
import { transformFact } from '~/lib/getStatic/helpers/transformFact';
import { Fact as TFact, factProjection } from '~/lib/groq/fact.projection';
import { Picture } from '~/lib/groq/picture.projection';
import { Link } from '~/lib/Link';
import { sanityClient } from '~/shared/lib/sanityio';

export default function Latest(p: any) {
  return (
    <Page
      id="latest-facts-page"
      title="The latest celebrity religion and politics information in Hollowverse"
      description="The latest Facts added to Hollowverse"
      pathname="~latest"
      allowSearchEngines={false}
      className="text-neutral-600"
    >
      <div className="h-container flex flex-col gap-5">
        <h1 className="mt-5 px-5 text-xl font-bold">
          Most recent additions...
        </h1>

        {p.firstBatch.map((f: any) => {
          const cardTitle = (
            <Link passHref href={`/${f.celeb.slug}`}>
              <a>
                <div className="flex flex-row items-center gap-3">
                  <div className="h-[75px] w-[75px] overflow-hidden rounded-md">
                    <CelebImage
                      width={150}
                      height={150}
                      name={f.celeb.name}
                      picture={f.celeb.picture}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>{f.celeb.name}</p>
                    <p className="text-base text-neutral-500">
                      {f.issues[0].name}
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          );

          return (
            <TitledCard titledContentProps={{ title: cardTitle }} key={f._id}>
              <div className="p-5">
                <Fact
                  link
                  slug={f.celeb.slug}
                  fact={f}
                  celebName={f.celeb.name}
                />
              </div>
            </TitledCard>
          );
        })}
      </div>
    </Page>
  );
}

export const getStaticProps = async () => {
  const firstBatch = await sanityClient.fetch<
    (TFact & { celeb: { name: string; picture: Picture; slug: string } })[]
  >(
    'latest-page-facts',
    groq`*[_type == 'fact'] | order(_updatedAt desc, _createdAt desc)[0..49] {
      'celeb': celeb->{
        name,
        'picture': picture.asset->{
          _id,
          'metadata': {
            'lqip': metadata.lqip,
            'palette': metadata.palette
          }
        },
        'slug': slug.current
      },
      ${factProjection}
    }`,
  );

  return {
    props: {
      firstBatch: firstBatch?.map((f) => transformFact(f)),
    },
    revalidate: 60 * 60 * 24, // revalidate every 24 hours
  };
};
