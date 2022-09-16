import { Button } from '@mui/material';
import { FaRegEdit, FaInfoCircle } from 'react-icons/fa';
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
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

export default function CelebPageFactsOnly(props: CelebPagePropsFactsOnly) {
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
        <CelebSummary {...props} />

        <TitledCard titledContentProps={{ title: 'Wiki' }}>
          <div className="p-5">
            <p>
              Be the first to write a short wiki about {props.celeb.name}'s
              religion and political views.
            </p>

            <div>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Button
                  startIcon={<EditIcon />}
                  size="small"
                  variant="contained"
                  className="w-fit bg-blue-500"
                >
                  Write a short wiki
                </Button>

                <Button startIcon={<InfoIcon />} size="small" className="w-fit">
                  How to write a wiki
                </Button>
              </div>
            </div>
          </div>
        </TitledCard>

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
