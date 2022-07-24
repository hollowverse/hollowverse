import { FactGroup } from '~/components/FactGroup';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';

export const Facts = (props: CelebPageProps) => {
  return (
    <div className="FACTS-CONTAINER flex max-w-full flex-col gap-7">
      <div className="flex flex-col gap-2.5">
        <FactGroup
          showIssueName
          title={
            <h2 className="flex gap-2">
              {props.celeb.name}&apos;s latest views
            </h2>
          }
          factGroup={props.facts}
          celebName={props.celeb.name}
          slug={props.celeb.slug}
        />
      </div>
    </div>
  );
};
