import { isEmpty } from 'lodash-es';
import { IssuesSideScroller } from '~/components/IssuesSideScroller';
import { JsonView } from '~/components/JsonView';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';

export const Facts = (props: CelebPageProps) => {
  return (
    <div className="FACTS-CONTAINER flex max-w-full flex-col gap-7">
      {!isEmpty(props.celeb.issues.affiliations) && (
        <div className="flex flex-col gap-2.5">
          <h2 className="scale-y-110 px-5 text-xl font-semibold">
            {props.celeb.name}&apos;s
          </h2>

          <IssuesSideScroller
            issues={props.celeb.issues.affiliations}
            getLink={(_id) => `/${props.celeb.slug}/issue/${_id}`}
          />
        </div>
      )}

      {!isEmpty(props.celeb.issues.views) && (
        <div className="flex flex-col gap-2.5">
          <h2 className="scale-y-110 px-5 text-xl font-semibold">
            {props.celeb.name}&apos;s views on
          </h2>

          <IssuesSideScroller
            issues={props.celeb.issues.views}
            getLink={(_id) => `/${props.celeb.slug}/issue/${_id}`}
          />
        </div>
      )}

      <div>
        <JsonView src={props.celeb.issues} />
      </div>

      {/* {issues.map((issue, i) => {
        const factGroup = groups[issue];

        return (
          <FactGroup
            index={i}
            key={issue}
            title={
              <h2 className="flex gap-2">
                {props.celeb.name} <TitleSeparator /> {issue}
              </h2>
            }
            factGroup={factGroup}
            celebName={props.celeb.name}
            slug={props.celeb.slug}
          />
        );
      })} */}
    </div>
  );
};
