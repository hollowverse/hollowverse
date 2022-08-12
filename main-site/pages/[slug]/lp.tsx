import { Page } from '~/lib/Page';
import { TitledCard } from '~/lib/TitledCard';
import { LaunchPadPageProps } from '~/lib/launchPadCeleb.getStaticProps';

export default function ResearcherLaunchPad(props: LaunchPadPageProps) {
  return (
    <Page
      id="launch-pad-page"
      title={`Research ${props.celebName}'s religion and political views`}
      description={`Hollowverse researcher's launch pad for researching ${props.celebName}`}
      allowSearchEngines={false}
      pathname={props.pathname}
    >
      <div className="h-container my-5 flex flex-col gap-5">
        <TitledCard
          titledContentProps={{
            title: `Suggested Google searches to research ${props.celebName}'s views`,
          }}
        >
          <div className="flex flex-col gap-7 p-5">
            {Object.keys(props.tags).map((k) => {
              const tags = props.tags[k];

              return (
                <div key={k}>
                  <h1 className="text-lg font-bold">{k}</h1>

                  <div className="flex flex-col gap-3 py-2">
                    {tags.map((t) => {
                      return (
                        <a
                          rel="noreferrer"
                          target="_blank"
                          className="h-link hover:bg-gray-200"
                          key={`${t.issue}-${t.name}`}
                          href={`https://www.google.com/search?q=${encodeURIComponent(
                            `${props.celebName} ${t.name}`,
                          )}`}
                        >
                          {t.name}
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </TitledCard>
      </div>
    </Page>
  );
}

export { getStaticPaths } from '~/lib/default.getStaticPaths';
export { getStaticProps } from '~/lib/launchPadCeleb.getStaticProps';
