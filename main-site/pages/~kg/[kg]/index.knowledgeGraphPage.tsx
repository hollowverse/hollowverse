import { FaRegCheckCircle } from 'react-icons/fa';
import { CelebImage } from '~/lib/CelebImage';
import { Page } from '~/lib/Page';
import { Card } from '~/lib/Card.ui';
import { KnowledgeGraphCelebParams } from '~/shared/lib/knowledgeGraphClient';
import { CelebSummary } from '~/lib/CelebSummary';
import { WriteWikiCta } from '~/lib/WriteWikiCta';

export default function KnowledgeGraphCeleb(props: KnowledgeGraphCelebParams) {
  return (
    <Page
      id="knowledge-graph-page"
      title={`Request to add ${props.name}`}
      description={`Request to add ${props.name} to Hollowverse`}
      pathname={`/~kg/${encodeURIComponent(props['@id'])}`}
      allowSearchEngines={false}
    >
      <Card topBorder={false}>
        <div className="p-5">
          <div className="mt-5 flex flex-col items-center gap-5">
            <div
              id="kg-celeb-image"
              className="aspect-square h-[200px] w-[200px]"
            >
              <CelebImage
                className="rounded-md object-cover"
                key={props.name + '-topSection-image'}
                name={props.name}
                src={props.image?.contentUrl}
                priority
              />
            </div>
            <h1 className="mt-5 text-center">
              <span className="mt-2 block text-4xl font-extrabold tracking-tight">
                {props.name}
              </span>
              {props.description && (
                <span className="text-base font-normal tracking-wide text-neutral-500">
                  {' ' + props.description}
                </span>
              )}
            </h1>
          </div>
        </div>
      </Card>

      <div className="h-container flex flex-col gap-5 py-5">
        <Card className="p-5">
          <div className="flex flex-col gap-2 text-base text-neutral-600">
            <p>
              We don't have a page for {props.name} yet. But we invite you to
              create one!
            </p>

            <p>
              Just write a quick summary or a wiki to create a page for{' '}
              {props.name}.
            </p>
          </div>
        </Card>

        <CelebSummary celeb={{ name: props.name }} positions={[]} />

        <WriteWikiCta celeb={{ name: props.name }} />
      </div>
    </Page>
  );
}

export { getStaticPaths } from '~/lib/default.getStaticPaths';
export { getStaticProps } from '~/lib/kgPage.getStaticProps';
