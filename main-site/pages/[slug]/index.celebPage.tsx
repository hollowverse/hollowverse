import { isEmpty } from 'lodash-es';
import { StickyAppBar } from '~/components/AppBar';
import { FacebookComments } from '~/components/FacebookComments';
import { Facts } from '~/components/Facts';
import { Md } from '~/components/Md';
import { Page } from '~/components/Page';
import { InBetweenContentShareButton } from '~/components/ShareButton';
import { TopContributors } from '~/components/TopContributors';
import {
  TopSection,
  TsTitleContainer,
  TsTitleSoftText,
  TsTitleStrongText,
} from '~/components/TopSection';
import { TitledCard } from '~/components/ui/TitledCard';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';

export default function Celeb(props: CelebPageProps) {
  const name = props.celeb.name;

  return (
    <Page
      title={
        props.hasFacts
          ? `What are the political views of ${name}?`
          : `${name}'s Religion and Political Views`
      }
      description={props.pageDescription}
      allowSearchEngines
      pathname={props.celeb.slug}
      id="celeb-page"
      appBar={
        <StickyAppBar>
          <TopSection
            issues={props.celeb.issues}
            celeb={props.celeb}
            tagTimeline={props.tagTimeline}
            title={
              <TsTitleContainer>
                <TsTitleSoftText>
                  The {props.hasFacts ? '' : 'Religion and '}Political Views of{' '}
                </TsTitleSoftText>
                <TsTitleStrongText>{name}</TsTitleStrongText>
              </TsTitleContainer>
            }
          />
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
          <div className="my-1 mx-3">
            <FacebookComments pathname={`/${props.celeb.slug}`} />
          </div>
        </TitledCard>
      </div>
    </Page>
  );
}

export { getStaticProps } from '~/lib/getStatic/celebPage.getStaticProps';
export { getStaticPaths } from '~/lib/getStatic/default.getStaticPaths';
