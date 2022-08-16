import groq from 'groq';
import { JsonView } from '~/lib/JsonView';
import { Page } from '~/lib/Page';
import { oneDay, oneMinute } from '~/lib/date';
import { Fact as TFact, factProjection } from '~/lib/fact.projection';
import { sanityClient } from '~/shared/lib/sanityio';
import { PageProps } from '~/shared/lib/types';
import { AppBar } from '~/lib/AppBar';
import { CelebPageHero } from '~/lib/CelebPageHero';
import { Card } from '~/lib/Card.ui';
import { CelebImage } from '~/lib/CelebImage';
import { getCeleb } from '~/lib/getCeleb';
import {
  Hero,
  HeroTopContainer,
  HeroCelebImage,
  HeroTitleContainer,
  HeroTitleSoftText,
  HeroTitleStrongText,
} from '~/lib/Hero';
import { H3 } from '~/lib/H3.ui';
import { Input } from '~/lib/Input.ui';
import { c } from '~/lib/c';
import { RadioGroup, RadioOption } from '~/lib/RadioOption.ui';
import { Button } from '~/lib/Button.ui';

type EditPageProps = PageProps<typeof getStaticProps>;

export default function EditPage(props: EditPageProps) {
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
          <Card className="flex flex-col gap-3 p-5">
            <H3>Date of Birth</H3>

            <Input type="date" />
          </Card>

          <Card className="flex flex-col gap-3 p-5">
            <H3>Is {props.celeb.name} alive or dead?</H3>

            <RadioGroup
              value={{ name: 'Yes' }}
              onChange={() => null}
              className="flex gap-3"
            >
              <RadioOption value={{ name: 'alive' }}>
                <RadioGroup.Label>Alive</RadioGroup.Label>
              </RadioOption>
              <RadioOption value={{ name: 'deceased' }}>
                <RadioGroup.Label>Dead</RadioGroup.Label>
              </RadioOption>
            </RadioGroup>

            <div>
              <label
                htmlFor="dod"
                className="block text-sm font-medium text-gray-700"
              >
                Date {props.celeb.name} passed away
              </label>
              <div className="mt-1">
                <Input type="date" name="dod" id="dod" />
              </div>
            </div>
          </Card>

          <div className="flex justify-end p-5">
            <Button type="submit">Submit</Button>
          </div>
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
