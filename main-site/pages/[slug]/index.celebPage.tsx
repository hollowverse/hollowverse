import { isEmpty } from 'lodash-es';
import { StickyAppBar } from '~/components/AppBar';
import { FacebookComments } from '~/components/FacebookComments';
import { Facts } from '~/components/Facts';
import { Md } from '~/components/Md';
import { Page } from '~/components/Page';
import { InBetweenContentShareButton } from '~/components/ShareButton';
import { TopContributors } from '~/components/TopContributors';
import { TopSection } from '~/components/TopSection';
import { TitledCard } from '~/components/ui/TitledCard';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';

export default function Celeb(props: CelebPageProps) {
  const name = props.celeb.name;

  return (
    <Page
      title={`${name}'s religion and political views`}
      description={`Did ${name} say or do anything political or about religion? Find out here!`}
      allowSearchEngines
      pathname={props.celeb.slug}
      id="celeb-page"
      appBar={
        <StickyAppBar>
          <TopSection {...props.celeb} />
        </StickyAppBar>
      }
    >
      <div
        className="h-container my-5 flex flex-col gap-5"
        id={`celeb-page-${props.celeb.slug}`}
      >
        <InBetweenContentShareButton />

        {!isEmpty(props.celeb.facts) && <Facts {...props} />}

        {props.celeb.oldContent && <Md {...props} />}

        {!isEmpty(props.topContributors) ? (
          <TopContributors
            contributors={props.topContributors!}
            celebName={props.celeb.name}
          />
        ) : null}

        <TitledCard
          titledContentProps={{
            title: (
              <span className="text-base">
                Your thoughts on {props.celeb.name}?
              </span>
            ),
            stickyTitle: false,
          }}
        >
          <FacebookComments pathname={`/${props.celeb.slug}`} />
        </TitledCard>
      </div>
    </Page>
  );
}

export { getStaticProps } from '~/lib/getStatic/celebPage.getStaticProps';
export { getStaticPaths } from '~/lib/getStatic/default.getStaticPaths';
