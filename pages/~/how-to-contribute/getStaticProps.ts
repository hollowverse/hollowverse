import { remark } from 'remark';
import remarkHtml from 'remark-html';
import path from 'path';
import appRoot from 'app-root-path';
import fs from 'fs-extra';

export const getStaticProps = async () => {
  const howToContributePath = path.join(
    appRoot.path,
    'pages',
    '~',
    'how-to-contribute',
    'howToContribute.md',
  );
  const howToContributeMd = fs.readFileSync(howToContributePath);

  const howToContributeHtml = (
    await remark()
      .use(remarkHtml, { sanitize: false })
      .process(howToContributeMd)
  ).toString();

  return {
    props: {
      howToContributeHtml,
    },
  };
};
