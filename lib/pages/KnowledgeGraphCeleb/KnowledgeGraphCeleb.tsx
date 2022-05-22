import React from 'react';
import { ContributeCta } from '~/lib/pages/components/ContributeCta';
import { Card } from '~/lib/pages/components/Card';
import { CelebImage } from '~/lib/pages/components/CelebImage';
import { Page } from '~/lib/pages/components/Page';
import { useKnowledgeGraphCeleb } from '~/lib/pages/KnowledgeGraphCeleb/useKnowledgeGraphCeleb';
import { FaRegCheckCircle } from 'react-icons/fa';
import { KnowledgeGraphCeleb } from '~/lib/pages/utils/knowledgeGraphClient';
import Link from 'next/link';

export function KnowledgeGraphCeleb(params: KnowledgeGraphCeleb) {
  useKnowledgeGraphCeleb(params.name);

  return (
    <Page
      title={`Request to add ${params.name}`}
      description={`Request to add ${params.name} to Hollowverse`}
      pathname={`~kg/${encodeURIComponent(params['@id'])}`}
      allowSearchEngines={false}
    >
      <Card>
        <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 p-6">
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
                {params.description}
              </span>
            )}
          </h1>
        </div>
      </Card>

      <div className="mx-auto w-full max-w-3xl">
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
                  href="https://forum.hollowverse.com/badges/109/jupiter"
                >
                  <span className="font-semibold">Jupiter badge</span>
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
