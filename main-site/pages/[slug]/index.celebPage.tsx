import CelebPageFactsOnly from '~/lib/CelebPageFactsOnly';
import { CelebPageMain } from '~/lib/CelebPageMain';

export default function CelebPage(props: any) {
  if (!props.celeb.wiki) {
    return <CelebPageFactsOnly {...props} />;
  }

  return <CelebPageMain {...props} />;
}

export { getStaticProps } from '~/lib/celebPage.getStaticProps';
export { getStaticPaths } from '~/lib/default.getStaticPaths';
