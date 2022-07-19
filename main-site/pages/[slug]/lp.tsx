import { JsonView } from '~/components/JsonView';
import { Page } from '~/components/Page';
import { TitledCard } from '~/components/ui/TitledCard';
import { LaunchPadPageProps } from '~/lib/getStatic/launchPadCeleb.getStaticProps';

export default function ResearcherLaunchPad(props: LaunchPadPageProps) {
  return (
    <Page
      id="launch-pad-page"
      title={`Research ${props.celebName}'s religion and political views`}
      description={`Hollowverse researcher's launch pad for researching ${props.celebName}`}
      allowSearchEngines={false}
      pathname={props.pathname}
    >
      <div className="h-container mt-5 flex flex-col gap-5">
        <TitledCard
          titledContentProps={{
            title: `Suggested Google searches to research ${props.celebName}'s views`,
          }}
        >
          <div className="flex flex-col gap-1 py-4">
            {/* <JsonView src={props} /> */}
            {props.tags.map((t) => {
              return (
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="h-link p-1 px-3"
                  key={t}
                  href={`https://www.google.com/search?q=${encodeURIComponent(
                    `${props.celebName} ${t}`,
                  )}`}
                >
                  {t}
                </a>
              );
            })}
          </div>
        </TitledCard>
      </div>
    </Page>
  );
}

export { getStaticPaths } from '~/lib/getStatic/default.getStaticPaths';
export { getStaticProps } from '~/lib/getStatic/launchPadCeleb.getStaticProps';
