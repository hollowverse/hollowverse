import { NavBar } from '~/lib/NavBar';
import { Page } from '~/lib/Page.v2';

export default function Search() {
  return (
    <Page
      title={`Search the religions and political views of celebrities`}
      description={`Search the religions and political views of celebrities`}
      pathname={`/~search`}
      allowSearchEngines
      id="search-page"
    >
      <NavBar />
    </Page>
  );
}
