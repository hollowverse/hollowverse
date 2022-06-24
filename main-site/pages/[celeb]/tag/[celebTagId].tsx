import { isEmpty, result } from 'lodash-es';
import React, { PropsWithChildren } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { StickyAppBar } from '~/components/AppBar';
import { CelebImage } from '~/components/CelebImage';
import { FactGroup } from '~/components/FactGroup';
import { JsonView } from '~/components/JsonView';
import { Page } from '~/components/Page';
import { Tag } from '~/components/Tag';
import { TitleSeparator } from '~/components/TitleSeparator';
import { TopSection } from '~/components/TopSection';
import {
  CelebHorizontalRect,
  CHRContainer,
  CHRContent,
  CHRImage,
} from '~/components/ui/CelebHorizontalRect';
import { TitledCard } from '~/components/ui/TitledCard';
import { TitledContent } from '~/components/ui/TitledContent';
import { c } from '~/lib/c';
import { TagPageProps } from '~/lib/getStatic/tagPage.getStaticProps';
import { Link } from '~/lib/Link';
import { ReactElementProps } from '~/lib/types';

export function CardTitle(
  props: ReactElementProps<'div'> & { component?: React.ElementType },
) {
  const Root = 'h2' || props.component;

  return (
    <Root
      {...props}
      className={c(
        'flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-lg',
        props.className,
      )}
    />
  );
}

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
          <div className="flex flex-col gap-5">
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
                  `ml-5 flex w-fit items-center gap-1.5 rounded-lg bg-gray-200 px-3 py-2.5 text-neutral-600 shadow-sm transition focus:border-purple-300 active:bg-opacity-10`,
                )}
              >
                <FaChevronDown
                  className={'rotate-90 text-xl text-purple-500'}
                />
                List of other {props.celeb.name} views
              </a>
            </Link>

            {!isEmpty(props.otherCelebsWithTag) && (
              <TitledContent
                title={
                  <CardTitle className="px-5 py-4">
                    Others <TitleSeparator />{' '}
                    <Tag slug={props.celeb.slug} tagId={props.tag.tag._id}>
                      {props.tag.tag.name}
                    </Tag>
                  </CardTitle>
                }
                stickyTitle
              >
                {props.otherCelebsWithTag!.map((c) => {
                  return (
                    <CelebHorizontalRect
                      className="lg:-mt-[1px]"
                      key={c._id}
                      link={`/${c.slug}`}
                    >
                      <CHRImage
                        celebImageProps={{
                          name: c.name,
                          picture: c.picture,
                          alt: c.name,
                        }}
                      />

                      <CHRContent title={c.name} body={'Stuff'} />
                    </CelebHorizontalRect>
                  );
                })}
              </TitledContent>
            )}

            {!isEmpty(props.otherCelebsWithIssue) && (
              <TitledContent
                title={
                  <CardTitle className="px-5 py-4">
                    Others <TitleSeparator /> {props.tag.tag.issue.name}
                  </CardTitle>
                }
                stickyTitle
              >
                {props.otherCelebsWithIssue!.map((c) => {
                  return (
                    <CelebHorizontalRect
                      className="lg:-mt-[1px]"
                      key={c._id}
                      link={`/${c.slug}`}
                    >
                      <CHRImage
                        celebImageProps={{
                          name: c.name,
                          picture: c.picture,
                          alt: c.name,
                        }}
                      />

                      <CHRContent title={c.name} body={'Stuff'} />
                    </CelebHorizontalRect>
                  );
                })}
              </TitledContent>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}

export { getStaticPaths } from '~/lib/getStatic/defaultGetStaticPaths';
export { getStaticProps } from '~/lib/getStatic/tagPage.getStaticProps';
