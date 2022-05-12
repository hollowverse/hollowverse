import React from 'react';
import { ForumInvite } from '~/lib/pages/Celeb/ForumInvite';
import { Card } from '~/lib/pages/components/Card';
import { CelebImage } from '~/lib/pages/components/CelebImage';
import { Page } from '~/lib/pages/components/Page';
import { useKnowledgeGraphCeleb } from '~/lib/pages/KnowledgeGraphCeleb/useKnowledgeGraphCeleb';
import { BsPatchCheck } from 'react-icons/Bs';

export function KnowledgeGraphCeleb(params: any) {
  useKnowledgeGraphCeleb(params.name);

  return (
    <Page>
      <Card>
        <div className="mx-auto max-w-3xl rounded-md bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="py-3 px-3 lg:px-8 sm:px-6">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex w-0 flex-1 items-center">
                <span className="flex rounded-lg p-2">
                  <BsPatchCheck stroke="10" className="text-xl text-white" />
                </span>
                <p className="ml-3 text-white">
                  We&apos;ve recorded your request to add{' '}
                  <span className="font-bold">{params.name}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center gap-5">
          <div className="aspect-square h-[200px] w-[200px] rounded-md">
            <CelebImage
              className="rounded-md object-cover"
              key={params.name + '-topSection-image'}
              slug={params.slug}
              name={params.name}
              src={params.image.contentUrl}
              priority
            />
          </div>
          <h1 className="mt-5 text-center">
            <span className="mt-2 block text-4xl font-extrabold tracking-tight">
              {params.name}
            </span>

            <span className="text-base font-normal tracking-wide text-neutral-500">
              {params.description}
            </span>
          </h1>
        </div>
        {/* <pre>{JSON.stringify(params, null, 2)}</pre> */}
      </Card>

      <div className="mx-auto max-w-4xl">
        <ForumInvite
          name={params.name}
          cta={
            <>
              Help us get started by sharing anything you know about{' '}
              <span className="font-bold">{params.name}</span>. You can write it
              in the box below!
            </>
          }
        />
      </div>
    </Page>
  );
}
