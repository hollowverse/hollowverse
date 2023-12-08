import AdUnit from '~/lib/AdUnit';
import { AppBar } from '~/lib/AppBar';
import { Article } from '~/lib/Article';
import { c } from '~/lib/c';
import { Card } from '~/lib/Card.ui';
import { CelebPageHero } from '~/lib/CelebPageHero';
import { CelebPageMainProps } from '~/lib/celebPageMain.getStaticProps';
import { CelebSummary } from '~/lib/CelebSummary';
import ContentWithSiderailContainer from '~/lib/ContentWithSiderailContainer';
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

      <ContentWithSiderailContainer
        className={c('h-container my-5 flex flex-col gap-5', props.celeb.slug)}
        id="content"
      >
        <section className="flex flex-col gap-5">
          <CelebSummary celeb={props.celeb} positions={props.positions} />

          <div className="flex h-[250px] w-full items-center justify-center">
            {/* Desktop Ad */}
            <AdUnit deliveryId="pubg-j5k-b36" className="hidden md:block" />
            {/* Mobile Ad */}
            <AdUnit deliveryId="pubg-48d-8fu" className="md:hidden" />{' '}
          </div>

          <Article {...props} />

          <div className="flex h-[250px] w-full items-center justify-center">
            {/* Desktop Ad */}
            <AdUnit deliveryId="pubg-j5k-b36" className="hidden md:block" />
            {/* Mobile Ad */}
            <AdUnit deliveryId="pubg-48d-8fu" className="md:hidden" />{' '}
          </div>

          <InterestingProfiles {...props} />
        </section>

        <TitledCard
          titledContentProps={{
            title: (
              <span className="text-base">What do you think of this?</span>
            ),
          }}
        >
          <div id="fact-page-comments" className="mx-3 my-1">
            <FacebookComments pathname={`/${props.celeb.slug}`} />
          </div>
        </TitledCard>
      </ContentWithSiderailContainer>
      <div className="mb-5 flex h-[250px] w-full items-center justify-center">
        {/* Desktop Ad */}
        <AdUnit deliveryId="pubg-j5k-b36" className="hidden md:block" />
        {/* Mobile Ad */}
        <AdUnit deliveryId="pubg-48d-8fu" className="md:hidden" />{' '}
      </div>
    </Page>
  );
}
