import { SearchResults } from '~/lib/useSearch';
import {
  CelebHorizontalRect,
  CHRContent,
  CHRImage,
} from '~/lib/CelebHorizontalRect';
import { c } from '~/lib/c';

export function SearchResults(params: NonNullable<SearchResults>) {
  const { results, hasHvResults } = params;

  return (
    <div className="grid w-full lg:my-5 lg:gap-5 lg:px-2">
      {results.map((r) => {
        const { result } = r;

        return (
          <div id="search-result" key={result['@id']}>
            <CelebHorizontalRect
              link={`/${
                result.slug || '~kg/' + encodeURIComponent(result['@id'])
              }`}
              className={c({ 'opacity-[80%]': !result.slug && hasHvResults })}
            >
              <CHRImage
                celebImageProps={{
                  ...(result.picture
                    ? { picture: result.picture }
                    : { src: result.image!.contentUrl }),
                  name: result.name,
                  alt: result.name,
                }}
              />

              <CHRContent
                title={result.name}
                body={
                  <p className="text-xs text-gray-500 xs:text-base">
                    {result.description}
                  </p>
                }
              />

              {!result.slug && (
                <div className="pointer-events-none absolute top-5 bottom-5 right-0 my-auto mr-[3%] flex h-[99%] flex-col justify-center bg-gradient-to-r from-transparent via-white to-white pl-24">
                  <div className="rounded-full border border-gray-300 bg-white px-5 py-1 text-xs text-gray-500 shadow-sm transition hover:border-gray-400 hover:text-gray-600 active:border-gray-500 active:text-gray-700 xs:text-sm">
                    Add
                  </div>
                </div>
              )}
            </CelebHorizontalRect>
          </div>
        );
      })}
    </div>
  );
}
