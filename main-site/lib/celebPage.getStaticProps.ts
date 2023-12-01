import { celebPageFactsOnlyGetStaticProps } from '~/lib/celebPageFactsOnly.getStaticProps';
import { celebPageMainGetStaticProps } from '~/lib/celebPageMain.getStaticProps';
import { getCeleb } from '~/lib/getCeleb';
import { log } from '~/shared/lib/log';
import { PageProps } from '~/shared/lib/types';

export type CelebPageProps = PageProps<typeof getStaticProps>;

export async function getStaticProps({
  params,
}: {
  params: { slug: string; p: string | undefined };
}) {
  log('info', `celebPage getStaticProps called: ${params.slug}`);
  const celeb = await getCeleb(params.slug);

  if (!celeb) {
    return { notFound: true };
  }

  if (!celeb.wiki) {
    return celebPageFactsOnlyGetStaticProps({ params }, celeb);
  }
  // if (!celeb.oldContent) {
  //   return celebPageFactsOnlyGetStaticProps({ params }, celeb);
  // }

  return celebPageMainGetStaticProps({ params }, celeb);
}
