import { CelebFacts } from '~/lib/deprecated/CelebFacts';
import { CelebPageProps } from '~/lib/celebPage.getStaticProps';
import { NavigationTip } from '~/lib/NavigationTip';
import { Pagination } from '~/lib/Pagination';
import { CelebPagePropsFactsOnly } from '~/lib/celebPageFactsOnly.getStaticProps';

export const CelebPageFacts = (props: CelebPagePropsFactsOnly) => {
  return (
    <div className="flex max-w-full flex-col gap-7">
      <NavigationTip celebName={props.celeb.name} />

      <div className="flex flex-col gap-2.5">
        <CelebFacts
          showIssueName
          factGroup={props.facts}
          celeb={props.celeb}
          slug={props.celeb.slug}
        />
      </div>

      <Pagination
        {...props.pagination}
        getLink={(pageNumber) =>
          pageNumber === 1
            ? `/${props.celeb.slug}`
            : `/${props.celeb.slug}/p/${pageNumber}#content`
        }
      />
    </div>
  );
};
