import clsx from 'clsx';
import { isEmpty } from 'lodash-es';
import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { StickyAppBar } from '~/components/AppBar';
import { Card, CardTitle } from '~/components/Card';
import { CelebGallery } from '~/components/CelebGallery';
import { CelebImage } from '~/components/CelebImage';
import { FactGroup } from '~/components/FactGroup';
import { JsonView } from '~/components/JsonView';
import { Page } from '~/components/Page';
import { TitleSeparator } from '~/components/TitleSeparator';
import { TopSection } from '~/components/TopSection';
import { c } from '~/lib/c';
import { TagPageProps } from '~/lib/getStatic/tagPage.getStaticProps';
import { Link } from '~/lib/Link';

export default function TagPage(props: TagPageProps) {
  const name = props.celeb.name;

  return (
    <Page
      title={`${name}'s religion and political views`}
      description={`A collection of everything political or religious that ${name} said or did.`}
      allowSearchEngines
      pathname={props.celeb.slug}
      appBar={
        <StickyAppBar>
          <TopSection {...props.celeb} />
        </StickyAppBar>
      }
    >
      <div className="h-container py-5">
        <div className="flex flex-col gap-7">
          <div className="h-container mt-5 flex flex-col gap-5">
            <FactGroup
              factGroup={props.tagFacts}
              celebName={props.celeb.name}
              slug={props.celeb.slug}
              title={
                <CardTitle>
                  {props.celeb.name} <TitleSeparator />{' '}
                  {props.tag.tag.issue.name}
                </CardTitle>
              }
            />

            <Link href={`/${props.celeb.slug}`} passHref>
              <a
                className={c(
                  `ml-5 flex w-fit items-center gap-1.5 rounded-lg bg-gray-200 px-3 py-2.5 text-neutral-600 shadow-sm transition hover:bg-opacity-10 focus:border-purple-300 active:bg-opacity-10`,
                )}
              >
                <FaChevronDown
                  className={'rotate-90 text-xl text-purple-500'}
                />
                List of other {props.celeb.name} views
              </a>
            </Link>

            {!isEmpty(props.otherCelebsWithTag) && (
              <Card
                title={
                  <CardTitle>
                    Others <TitleSeparator /> {props.tag.tag.name}
                  </CardTitle>
                }
                stickyTitle
                disablePadding
              >
                <CelebGallery
                  small
                  celebGalleryItems={props.otherCelebsWithTag!}
                />
                {/* <JsonView src={props.otherCelebsWithTag} /> */}
              </Card>
            )}

            {!isEmpty(props.otherCelebsWithIssue) && (
              <Card
                title={
                  <CardTitle>
                    Others <TitleSeparator /> {props.tag.tag.issue.name}
                  </CardTitle>
                }
                stickyTitle
                disablePadding
              >
                <JsonView src={props.otherCelebsWithIssue} collapsed={1} />
                {props.otherCelebsWithIssue!.map((c) => {
                  return (
                    <div className="flex" key={c.slug}>
                      <div className="w-1/3">
                        <CelebImage picture={c.picture} name={c.name} />
                      </div>

                      <div>{c.name}</div>
                    </div>
                  );
                })}
              </Card>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}

export { getStaticPaths } from '~/lib/getStatic/defaultGetStaticPaths';
export { getStaticProps } from '~/lib/getStatic/tagPage.getStaticProps';
