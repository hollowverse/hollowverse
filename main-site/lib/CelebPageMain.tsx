import { AppBar } from '~/lib/AppBar';
import { c } from '~/lib/c';
import { Card } from '~/lib/Card.ui';
import { CelebPageHero } from '~/lib/CelebPageHero';
import { CelebPageMainProps } from '~/lib/celebPageMain.getStaticProps';
import { FacebookComments } from '~/lib/FacebookComments';
import { Wiki } from '~/lib/Wiki';
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
        {props.celeb.oldContent && <Wiki {...props} />}

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
