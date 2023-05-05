import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { Button } from '@mui/material';
import AdUnit from '~/lib/AdUnit';
import { AppBar } from '~/lib/AppBar';
import { c } from '~/lib/c';
import { Card } from '~/lib/Card.ui';
import { CelebPageFacts } from '~/lib/CelebPageFacts';
import { CelebPagePropsFactsOnly } from '~/lib/celebPageFactsOnly.getStaticProps';
import { CelebPageHero } from '~/lib/CelebPageHero';
import { CelebSummary } from '~/lib/CelebSummary';
import ContentWithSiderailContainer from '~/lib/ContentWithSiderailContainer';
import { FacebookComments } from '~/lib/FacebookComments';
import { Page } from '~/lib/Page';
import { TitledCard } from '~/lib/TitledCard.ui';
import { WriteWikiCta } from '~/lib/WriteWikiCta';

export default function CelebPageFactsOnly(props: CelebPagePropsFactsOnly) {
  return (
    <Page
      title={`What are the political views and Religious Beliefs of ${props.celeb.name}?`}
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
        className={c('my-5 flex w-full flex-col gap-5 ', props.celeb.slug)}
        id="content"
      >
        <CelebSummary celeb={props.celeb} positions={props.positions} />

        <div className="flex h-[250px] w-full items-center justify-center">
          <AdUnit deliveryId="pubg-j5k-b36" />
        </div>

        <WriteWikiCta celeb={props.celeb} />

        <CelebPageFacts {...props} />

        <div className="flex h-[250px] w-full items-center justify-center">
          <AdUnit deliveryId="pubg-j5k-b36" />
        </div>

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

        <div className="flex h-[250px] w-full items-center justify-center">
          <AdUnit deliveryId="pubg-j5k-b36" />
        </div>
      </ContentWithSiderailContainer>
    </Page>
  );
}
