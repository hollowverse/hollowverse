import { isEmpty } from 'lodash-es';
import { MixedCelebFactList } from '~/components/MixedCelebFactList';
import { IssuesSideScroller } from '~/components/IssuesSideScroller';
import { JsonView } from '~/components/JsonView';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';
import { SingleCelebFactList } from '~/components/SingleCelebFactList';
import { FactGroup } from '~/components/FactGroup';
import { CelebViewsSelector } from '~/components/CelebViewsSelector';

export const Facts = (props: CelebPageProps) => {
  return (
    <div className="FACTS-CONTAINER flex max-w-full flex-col gap-7">
      <CelebViewsSelector
        celebName={props.celeb.name}
        slug={props.celeb.slug}
        issues={props.celeb.issues}
      />

      <div className="flex flex-col gap-2.5">
        <FactGroup
          title={
            <h2 className="flex gap-2">
              {props.celeb.name}&apos;s latest views
            </h2>
          }
          factGroup={props.celeb.facts}
          celebName={props.celeb.name}
          slug={props.celeb.slug}
        />

        {/* <SingleCelebFactList celeb={props.celeb} facts={props.celeb.facts} /> */}
      </div>
    </div>
  );
};
