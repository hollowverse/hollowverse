import Alert from '~/lib/Alert.ui';
import { AppBar } from '~/lib/AppBar';
import { c } from '~/lib/c';
import { Card } from '~/lib/Card.ui';
import { oneDay } from '~/lib/date';
import { EditForm } from '~/lib/EditForm';
import { getCeleb } from '~/lib/getCeleb';
import {
  Hero,
  HeroCelebImage,
  HeroTitleContainer,
  HeroTitleStrongText,
  HeroTopContainer,
} from '~/lib/Hero';
import { Page } from '~/lib/Page';
import { useLocalStorage } from '~/lib/useLocalStorage';
import { PageProps } from '~/shared/lib/types';

export type EditPageProps = PageProps<typeof getStaticProps>;

export default function EditPage(props: EditPageProps) {
  const [editAlertDismissed, setEditAlertDismissed] = useLocalStorage<boolean>(
    'edit-alert-dismissed',
    false,
  );

  return (
    <Page
      allowSearchEngines={false}
      description="Dump"
      id="dump-page"
      pathname={`/${props.slug}/edit`}
      title="Dump"
      appBar={<AppBar />}
    >
      <div>
        <Card>
          <Hero>
            <HeroTopContainer>
              <HeroCelebImage
                name={props.celeb.name}
                picture={props.celeb.picture}
              />
              <HeroTitleContainer>
                <HeroTitleStrongText>{props.celeb.name}</HeroTitleStrongText>
              </HeroTitleContainer>
            </HeroTopContainer>
          </Hero>
        </Card>

        <div className="h-container flex flex-col gap-3 py-5">
          <div className={c('px-2', { hidden: editAlertDismissed })}>
            <Alert color="yellow" onDismiss={() => setEditAlertDismissed(true)}>
              <div className="flex flex-col gap-3">
                <p className="font-semibold">Dear friend,</p>

                <p>
                  We really need you to help us find some information about{' '}
                  <span className="underline">{props.celeb.name}</span>.
                </p>

                <p>We're very grateful for your time!</p>
              </div>
            </Alert>
          </div>

          <EditForm {...props} />
        </div>
      </div>
    </Page>
  );
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const celeb = await getCeleb(params.slug);

  if (!celeb) {
    return { notFound: true };
  }

  return {
    props: {
      celeb,
      slug: params.slug,
    },

    revalidate: oneDay,
  };
}

export { getStaticPaths } from '~/lib/default.getStaticPaths';
