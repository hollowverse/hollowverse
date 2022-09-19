import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { CHRList } from '~/lib/CHRList';
import { Page } from '~/lib/Page';
import { RequestedPageProps } from '~/lib/requestedPage.getStaticProps';

export default function RequestedPfsPage(props: RequestedPageProps) {
  return (
    <Page
      title={'Most requested public figures'}
      allowSearchEngines={false}
      description={'Most requested public figures'}
      id={'requested'}
      pathname={'/~requested'}
    >
      <div className="h-container p-5">
        <CHRList
          celebs={props.requested!}
          title={'Requested'}
          renderBody={(c) => {
            return (
              <div className="flex gap-6 p-3">
                <p>
                  Wiki{' '}
                  {c.wiki ? (
                    <CheckIcon className="text-green-600" />
                  ) : (
                    <CloseIcon className="text-red-600" />
                  )}
                </p>

                <p>
                  Religion summary{' '}
                  {c.religionSummary ? (
                    <CheckIcon className="text-green-600" />
                  ) : (
                    <CloseIcon className="text-red-600" />
                  )}
                </p>

                <p>
                  Political Views summary{' '}
                  {c.polvisSummary ? (
                    <CheckIcon className="text-green-600" />
                  ) : (
                    <CloseIcon className="text-red-600" />
                  )}
                </p>
              </div>
            );
          }}
        />

        {/* <JsonView src={props} collapsed={4} /> */}
      </div>
    </Page>
  );
}

export { getStaticProps } from '~/lib/requestedPage.getStaticProps';
