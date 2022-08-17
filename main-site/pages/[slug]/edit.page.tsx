import Alert from '~/lib/Alert.ui';
import { AppBar } from '~/lib/AppBar';
import { Card } from '~/lib/Card.ui';
import { oneDay } from '~/lib/date';
import { EditForm } from '~/lib/EditForm';
import { getCeleb } from '~/lib/getCeleb';
import { H3 } from '~/lib/H3.ui';
import {
  Hero,
  HeroCelebImage,
  HeroTitleContainer,
  HeroTitleStrongText,
  HeroTopContainer,
} from '~/lib/Hero';
import { Page } from '~/lib/Page';
import { PageProps } from '~/shared/lib/types';
import useLocalStorage, { writeStorage } from '@rehooks/local-storage';
import { P } from '~/lib/P.ui';
import { c } from '~/lib/c';
import { useEffect, useState } from 'react';

export type EditPageProps = PageProps<typeof getStaticProps>;

export default function EditPage(props: EditPageProps) {
  const [editAlertDismissed] = useLocalStorage('edit-alert-dismissed', false);
  const [hideAlert, setHideAlert] = useState(false);

  useEffect(() => {
    setHideAlert(editAlertDismissed);
  }, [editAlertDismissed]);

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
          <div className={c('px-2', { hidden: hideAlert })}>
            <Alert
              onDismiss={() => writeStorage('edit-alert-dismissed', true)}
              body={
                <div className="flex flex-col gap-3">
                  <p className="font-semibold">Dear friend,</p>

                  <p>
                    This website will be taken down unless generous people like
                    you contribute! Please help us gather some information about{' '}
                    <span className="underline">{props.celeb.name}</span>.
                  </p>

                  <p>We're grateful for your time!</p>
                </div>
              }
            />
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
