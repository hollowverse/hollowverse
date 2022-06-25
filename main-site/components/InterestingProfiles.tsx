import { Tag } from '~/components/Tag';
import { TitleSeparator } from '~/components/TitleSeparator';
import {
  CelebHorizontalRect,
  CHRContent,
  CHRImage,
} from '~/components/ui/CelebHorizontalRect';
import { TitledContent } from '~/components/ui/TitledContent';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';
import { CardTitle, renderTags } from '~/pages/[celeb]/tag/[celebTagId]';

export const InterestingProfiles = (props: CelebPageProps) => {
  const relatedPeople = props.celeb.oldContent!.relatedPeople;

  return (
    <TitledContent
      title={
        <CardTitle className="px-5 py-4">Other interesting profiles</CardTitle>
      }
    >
      {relatedPeople!.map((c, i) => {
        return (
          <CelebHorizontalRect
            className="lg:-mt-[1px]"
            key={i}
            link={`/${c.slug}`}
          >
            <CHRImage
              celebImageProps={{
                name: c.name,
                picture: c.picture,
                alt: c.name,
              }}
            />

            <CHRContent
              title={c.name}
              body={
                <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {c.summaries.politicalViews} {c.summaries.religion}
                </p>
              }
            />
          </CelebHorizontalRect>
        );
      })}
    </TitledContent>
  );
};
