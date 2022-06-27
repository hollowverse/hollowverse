import { Page } from '~/components/Page';
import { TitledCard } from '~/components/ui/TitledCard';

export type ResearcherLaunchPadProps = {
  celebName: string;
  pathname: string;
  issues: string[];
};

export default function ResearcherLaunchPad(props: ResearcherLaunchPadProps) {
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
          <div className="flex flex-wrap gap-5 p-5">
            {props.issues.map((t) => {
              return (
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="h-link rounded-full border p-1 px-3"
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

export { getStaticPaths } from '~/lib/getStatic/defaultGetStaticPaths';
export { getStaticProps } from '~/lib/getStatic/launchPadCeleb.getStaticProps';
