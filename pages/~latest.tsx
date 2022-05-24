import groq from 'groq';
import Link from 'next/link';
import React from 'react';
import { Fact } from '~/components/Fact';
import { Card } from '~/components/Card';
import { CelebImage } from '~/components/CelebImage';
import { factPartialGroq } from '~/lib/groq/fact.partial.groq';
import { Page } from '~/components/Page';
import { sanityClient } from '~/lib/sanityio';
import { Fact as TFact } from '~/lib/types';
import { formatFactDate } from '~/lib/date';

export default function Latest(p: any) {
  return (
    <Page
      title="The latest celebrity religion and politics information in Hollowverse"
      description="The latest Facts added to Hollowverse"
      pathname="~latest"
      allowSearchEngines={false}
      className="text-neutral-600"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <h1 className="mt-5 px-5 text-xl font-bold">
          Most recent additions...
        </h1>

        {p.firstBatch.map((f: any) => (
          <Card
            title={
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
                        {f.topics[0].name}
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            }
            key={f._id}
            disablePadding
          >
            <Fact value={f} celebName={f.celeb.name} />
          </Card>
        ))}
      </div>
    </Page>
  );
}

export const getStaticProps = async () => {
  const firstBatch = await sanityClient.fetch(
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
      ${factPartialGroq}
    }`,
  );

  return {
    props: {
      firstBatch: firstBatch.map((f: TFact) => ({
        ...f,
        date: formatFactDate(f.date),
      })),
    },
  };
};