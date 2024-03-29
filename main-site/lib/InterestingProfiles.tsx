import { CelebPageMainProps } from '~/lib/celebPageMain.getStaticProps';
import { CHRList } from '~/lib/CHRList';

export const InterestingProfiles = (props: CelebPageMainProps) => {
  const relatedPeople = props.celeb.oldContent!.relatedPeople;

  return (
    <div id="interesting-profiles">
      <CHRList
        stickyTitle={false}
        title={<>Other interesting profiles</>}
        celebs={relatedPeople}
        renderBody={(c) =>
          c.summaries ? (
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-neutral-500">
              {c.summaries.politicalViews} {c.summaries.religion}
            </p>
          ) : null
        }
      />
    </div>
  );
};
