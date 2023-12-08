import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { Button } from '@mui/material';
import { AppBar } from '~/lib/AppBar';
import { c } from '~/lib/c';
import { Card } from '~/lib/Card.ui';
import { CelebPageFacts } from '~/lib/CelebPageFacts';
import { CelebPagePropsFactsOnly } from '~/lib/celebPageFactsOnly.getStaticProps';
import { CelebPageHero } from '~/lib/CelebPageHero';
import { CelebSummary } from '~/lib/CelebSummary';
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

      <div
        className={c('h-container my-5 flex flex-col gap-5', props.celeb.slug)}
        id="content"
      >
        <CelebSummary celeb={props.celeb} positions={props.positions} />

        {/* <WriteWikiCta celeb={props.celeb} /> */}

        <CelebPageFacts {...props} />

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
