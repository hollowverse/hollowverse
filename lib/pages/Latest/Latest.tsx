import groq from 'groq';
import React from 'react';
import { Fact } from '~/lib/pages/Celeb/Facts/Fact';
import { Card } from '~/lib/pages/components/Card';
import { CelebImage } from '~/lib/pages/components/CelebImage';
import { factPartialGroq } from '~/lib/pages/components/fact.partialGroq';
import { Page } from '~/lib/pages/components/Page';
import { sanityClient, sanityImage } from '~/lib/pages/utils/sanityio';
import Link from 'next/link';
import { formatFactDate } from '~/lib/utils/date';
import { Fact as TFact } from '~/lib/pages/utils/types';

export const Latest = (p: any) => {
  return (
    <Page
      title="The religions and political views of celebrities"
      description="Hollowverse tracks the religions and political views of celebrities"
      pathname=""
      allowSearchEngines
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
                        src={sanityImage(f.celeb.picture)
                          .fit('crop')
                          .crop('top')
                          .width(150)
                          .height(150)
                          .url()}
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
};

export const getStaticProps = async () => {
  const firstBatch = await sanityClient.fetch(
    groq`*[_type == 'fact'] | order(_updatedAt desc, _createdAt desc)[0..24] {
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

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
