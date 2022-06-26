import { CHRList } from '~/components/ui/CHRList';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';

export const InterestingProfiles = (props: CelebPageProps) => {
  const relatedPeople = props.celeb.oldContent!.relatedPeople;

  return (
    <div id="interesting-profiles">
      <CHRList
        stickyTitle={false}
        title={<>Other interesting profiles</>}
        celebs={relatedPeople}
        renderBody={(c) =>
          c.summaries ? (
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">
              {c.summaries.politicalViews} {c.summaries.religion}
            </p>
          ) : null
        }
      />
    </div>
  );
};
