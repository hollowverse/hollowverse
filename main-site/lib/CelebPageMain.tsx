import { AppBar } from '~/lib/AppBar';
import { Article } from '~/lib/Article';
import { c } from '~/lib/c';
import { Card } from '~/lib/Card.ui';
import { CelebPageHero } from '~/lib/CelebPageHero';
import { CelebPageMainProps } from '~/lib/celebPageMain.getStaticProps';
import { CelebSummary } from '~/lib/CelebSummary';
import { FacebookComments } from '~/lib/FacebookComments';
import { InterestingProfiles } from '~/lib/InterestingProfiles';
import { Page } from '~/lib/Page';
import { TitledCard } from '~/lib/TitledCard.ui';

export function CelebPageMain(props: CelebPageMainProps) {
  const name = props.celeb.name;

  return (
    <Page
      title={`What are the political views and Religious Beliefs of ${name}?`}
      description={props.pageDescription}
      allowSearchEngines
      pathname={props.pagePath}
      id="celeb-page"
      appBar={<AppBar />}
    >
      <Card topBorder={false}>
        <CelebPageHero {...props} />
      </Card>

      <div
        className={c('h-container my-5 flex flex-col gap-5', props.celeb.slug)}
        id="content"
      >
        <section className="flex flex-col gap-5">
          <CelebSummary celeb={props.celeb} positions={props.positions} />

          <Article {...props} />

          <InterestingProfiles {...props} />
        </section>

        <TitledCard
          titledContentProps={{
            title: (
              <span className="text-base">What do you think of this?</span>
            ),
          }}
        >
          <div id="fact-page-comments" className="my-1 mx-3">
            <FacebookComments pathname={`/${props.celeb.slug}`} />
          </div>
        </TitledCard>
      </div>
    </Page>
  );
}
