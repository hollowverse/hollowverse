import { FaRegEdit } from 'react-icons/fa';
import { CelebPageProps } from '~/lib/celebPage.getStaticProps';
import {
  Hero,
  HeroTopContainer,
  HeroCelebImage,
  HeroTitleContainer,
  HeroTitleSoftText,
  HeroTitleStrongText,
} from '~/lib/Hero';
import { Link } from '~/lib/Link';

export function CelebPageHero(props: CelebPageProps) {
  return (
    <Hero>
      <HeroTopContainer>
        <HeroCelebImage name={props.celeb.name} picture={props.celeb.picture} />
        <HeroTitleContainer>
          <HeroTitleSoftText>
            The Religion and Political Views of{' '}
          </HeroTitleSoftText>
          <HeroTitleStrongText>{props.celeb.name}</HeroTitleStrongText>
        </HeroTitleContainer>
      </HeroTopContainer>
      {/* <Link href={`/${props.celeb.slug}/edit`} passHref>
        <a className="flex w-fit items-center gap-3 rounded-md border border-blue-600 bg-blue-500 py-1 px-5 text-white">
          Edit {props.celeb.name}&apos;s page <FaRegEdit className="h-4 w-4" />
        </a>
      </Link> */}
    </Hero>
  );
}
