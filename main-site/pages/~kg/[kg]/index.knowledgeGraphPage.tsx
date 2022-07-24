import { FaRegCheckCircle } from 'react-icons/fa';
import { CelebImage } from '~/components/CelebImage';
import { ContributeCta } from '~/components/ContributeCta';
import { Page } from '~/components/Page';
import { Card } from '~/components/ui/Card';
import { TitledCard } from '~/components/ui/TitledCard';
import { Link } from '~/lib/Link';
import { KnowledgeGraphCelebParams } from '~/shared/lib/knowledgeGraphClient';

export default function KnowledgeGraphCeleb(params: KnowledgeGraphCelebParams) {
  return (
    <Page
      id="knowledge-graph-page"
      title={`Request to add ${params.name}`}
      description={`Request to add ${params.name} to Hollowverse`}
      pathname={`/~kg/${encodeURIComponent(params['@id'])}`}
      allowSearchEngines={false}
    >
      <Card topBorder={false}>
        <div className="p-5">
          <div
            id="kg-request-ack"
            className="h-container flex items-center gap-3 rounded-sm bg-gradient-to-r from-blue-500 to-purple-500 p-5"
          >
            <FaRegCheckCircle className="text-xl text-white" />

            <p className="text-white">
              We&apos;ve received your request to add{' '}
              <span className="font-bold">{params.name}</span>
            </p>
          </div>

          <div className="mt-5 flex flex-col items-center gap-5">
            <div
              id="kg-celeb-image"
              className="aspect-square h-[200px] w-[200px]"
            >
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
        </div>
      </Card>

      <Card className="h-container my-5 p-5">
        <div className="flex flex-col gap-2 text-base text-neutral-600">
          <p>Hey! 👋</p>

          <p>Help us kickstart {params.name}&apos;s page.</p>

          <p>Send us a tip about {params.name}&apos;s politics or beliefs!</p>

          <ContributeCta name={params.name} />
        </div>
      </Card>
    </Page>
  );
}

export { getStaticPaths } from '~/lib/getStatic/default.getStaticPaths';
export { getStaticProps } from '~/lib/getStatic/kgPage.getStaticProps';
