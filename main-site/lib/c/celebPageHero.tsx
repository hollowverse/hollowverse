import { CelebPageProps } from '~/lib/c/celebPage.getStaticProps';
import {
  Hero,
  HeroTopContainer,
  HeroCelebImage,
  HeroTitleContainer,
  HeroTitleSoftText,
  HeroTitleStrongText,
} from '~/lib/h/Hero';

export function CelebPageHero(props: CelebPageProps) {
  return (
    <Hero>
      <HeroTopContainer>
        <HeroCelebImage name={props.celeb.name} picture={props.celeb.picture} />
        <HeroTitleContainer>
          <HeroTitleSoftText>
            The {props.hasFacts ? '' : 'Religion and '}Political Views of{' '}
          </HeroTitleSoftText>
          <HeroTitleStrongText>{props.celeb.name}</HeroTitleStrongText>
        </HeroTitleContainer>
      </HeroTopContainer>
    </Hero>
  );
}
