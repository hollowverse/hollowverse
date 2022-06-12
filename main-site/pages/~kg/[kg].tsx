import React from 'react';
import { ContributeCta } from '~/components/ContributeCta';
import { Card } from '~/components/Card';
import { CelebImage } from '~/components/CelebImage';
import { Page } from '~/components/Page';
import { FaRegCheckCircle } from 'react-icons/fa';
import { KnowledgeGraphCelebParams } from '~/shared/knowledgeGraphClient';
import { Link } from '~/lib/Link';

export default function KnowledgeGraphCeleb(params: KnowledgeGraphCelebParams) {
  return (
    <Page
      title={`Request to add ${params.name}`}
      description={`Request to add ${params.name} to Hollowverse`}
      pathname={`~kg/${encodeURIComponent(params['@id'])}`}
      allowSearchEngines={false}
    >
      <Card>
        <div className="h-container flex items-center gap-3 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 p-6">
          <FaRegCheckCircle className="text-xl text-white" />

          <p className="text-white">
            We&apos;ve received your request to add{' '}
            <span className="font-bold">{params.name}</span>
          </p>
        </div>

        <div className="mt-5 flex flex-col items-center gap-5">
          <div className="aspect-square h-[200px] w-[200px] rounded-md">
            <CelebImage
              className="rounded-md object-cover"
              key={params.name + '-topSection-image'}
              name={params.name}
              src={params.image?.contentUrl}
              priority
            />
          </div>
          <h1 className="mt-5 text-center">
            <span className="mt-2 block text-4xl font-extrabold tracking-tight">
              {params.name}
            </span>
            {params.description && (
              <span className="text-base font-normal tracking-wide text-neutral-500">
                {' ' + params.description}
              </span>
            )}
          </h1>
        </div>
      </Card>

      <div className="h-container mt-5">
        <ContributeCta
          name={params.name}
          cta={
            <div className="flex flex-col gap-2 text-base">
              <p>Hey! 👋 Help us get started!</p>
              <p>
                Do you know anything about {params.name}&apos;s religion or
                political views?
              </p>

              <p>
                Send us a tip and claim your{' '}
                <span className="font-semibold">$50 Amazon gift card</span> when
                you reach the{' '}
                <a
                  className="h-link"
                  href="https://forum.hollowverse.com/badges/112/saturn"
                >
                  <span className="font-semibold">Saturn badge</span>
                </a>
                !
              </p>

              <p>
                <Link
                  passHref
                  href="https://forum.hollowverse.com/t/how-to-contribute-to-hollowverse/1929"
                >
                  <a className="h-link font-semibold">
                    Learn more about how to contribute!
                  </a>
                </Link>
              </p>
            </div>
          }
        />
      </div>
    </Page>
  );
}

export { getStaticPaths } from '~/lib/getStatic/defaultGetStaticPaths';
export { getStaticProps } from '~/lib/getStatic/kgPage.getStaticProps';
