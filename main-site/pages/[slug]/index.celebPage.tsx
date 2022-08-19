import { isEmpty } from 'lodash-es';
import { FaRegEdit } from 'react-icons/fa';
import { AppBar } from '~/lib/AppBar';
import { c } from '~/lib/c';
import { Card } from '~/lib/Card.ui';
import { CelebPageProps } from '~/lib/celebPage.getStaticProps';
import { CelebPageFacts } from '~/lib/CelebPageFacts';
import { CelebPageHero } from '~/lib/CelebPageHero';
import { HelpWanted } from '~/lib/HelpWanted';
import { Link } from '~/lib/Link';
import { Md } from '~/lib/Md';
import { Page } from '~/lib/Page';

export default function Celeb(props: CelebPageProps) {
  const name = props.celeb.name;

  return (
    <Page
      title={
        props.hasFacts
          ? `What are the political views and Religious Beliefs of ${name}?`
          : `${name}'s Religion and Political Views`
      }
      description={props.pageDescription}
      allowSearchEngines
      pathname={props.pagePath}
      id="celeb-page"
      appBar={<AppBar />}
    >
      <Card topBorder={false}>
        <CelebPageHero {...props} />
      </Card>

      <div
        className={c('h-container my-5 flex flex-col gap-5', props.celeb.slug)}
        id="content"
      >
        {props.celeb.oldContent && <Md {...props} />}

        {!isEmpty(props.facts) && !props.celeb.oldContent && (
          <CelebPageFacts {...props} />
        )}

        <HelpWanted pfName={props.celeb.name} slug={props.celeb.slug} />
      </div>
    </Page>
  );
}

export { getStaticProps } from '~/lib/celebPage.getStaticProps';
export { getStaticPaths } from '~/lib/default.getStaticPaths';
