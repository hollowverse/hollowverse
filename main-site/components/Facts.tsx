import { CelebImage } from '~/components/CelebImage';
import { FactGroup } from '~/components/FactGroup';
import { IssueSelector, noIssueFilter } from '~/components/IssueSelector';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';
import { celebNameToIssue } from '~/lib/language/celebNameToIssue';

export const Facts = (props: CelebPageProps) => {
  return (
    <div className="FACTS-CONTAINER flex max-w-full flex-col gap-7">
      <p className="px-5 font-bold">
        Below is evidence of Donald Trump&apos;s politics and beliefs. Use the
        selector at the bottom to see evidence for a specific topic 👇
      </p>
      <div className="flex flex-col gap-2.5">
        <FactGroup
          showIssueName
          title={
            <div className="-mr-5 flex gap-1">
              <div className="-my-2 w-[45px] shrink-0">
                <CelebImage
                  picture={props.celeb.picture}
                  name={props.celeb.name}
                  className="rounded-md"
                />
              </div>

              <IssueSelector
                useCardTitleStyle={true}
                getAnchorTitle={(i) => celebNameToIssue(props.celeb.name, i)}
                isSelected={(i) => i._id === noIssueFilter._id}
                issues={props.issues}
                getLink={(_id) =>
                  _id === noIssueFilter._id
                    ? `/${props.celeb.slug}`
                    : `/${props.celeb.slug}/issue/${_id}`
                }
              />
            </div>
          }
          factGroup={props.facts}
          celebName={props.celeb.name}
          slug={props.celeb.slug}
        />
      </div>
    </div>
  );
};
