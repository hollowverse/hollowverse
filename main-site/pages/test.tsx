import { useContext } from 'react';
import { NavBar } from '~/lib/NavBar';
import { Page, UserContext } from '~/lib/Page.v2';

export default function Search() {
  // const context = useContext(UserContext);

  // console.log('context', context);

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
