import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  CelebHorizontalRect,
  CHRContent,
  CHRImage,
} from '~/lib/CelebHorizontalRect';
import ContentWithSiderailContainer from '~/lib/ContentWithSiderailContainer';
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
      <ContentWithSiderailContainer>
        <div className="h-container p-5">
          {props.requested.map((pf: any) => {
            return (
              <div id="search-result" key={pf['@id'] || pf.slug}>
                <CelebHorizontalRect
                  link={`/${pf.slug || '~kg/' + encodeURIComponent(pf['@id'])}`}
                >
                  <CHRImage
                    celebImageProps={{
                      ...(pf.picture
                        ? { picture: pf.picture }
                        : { src: pf.image!.contentUrl }),
                      name: pf.name,
                      alt: pf.name,
                    }}
                  />

                  <CHRContent
                    title={pf.name}
                    body={
                      <div className="flex gap-6 p-3">
                        <p>
                          Wiki{' '}
                          {pf.wiki ? (
                            <CheckIcon className="text-green-600" />
                          ) : (
                            <CloseIcon className="text-red-600" />
                          )}
                        </p>

                        <p>
                          Religion summary{' '}
                          {pf.religionSummary ? (
                            <CheckIcon className="text-green-600" />
                          ) : (
                            <CloseIcon className="text-red-600" />
                          )}
                        </p>

                        <p>
                          Political Views summary{' '}
                          {pf.polvisSummary ? (
                            <CheckIcon className="text-green-600" />
                          ) : (
                            <CloseIcon className="text-red-600" />
                          )}
                        </p>
                      </div>
                    }
                  />
                </CelebHorizontalRect>
              </div>
            );
          })}
        </div>
      </ContentWithSiderailContainer>
    </Page>
  );
}

export { getStaticProps } from '~/lib/requestedPage.getStaticProps';
