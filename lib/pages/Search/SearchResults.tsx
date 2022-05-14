import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { c } from '~/lib/pages/utils/c';

export function SearchResults(params: { results: any; hasHvResults: boolean }) {
  const { results, hasHvResults } = params;

  return (
    <div className="flex w-full flex-col lg:my-5 lg:gap-5">
      {results?.map((r: any) => {
        return (
          <Link
            key={r.result['@id']}
            href={`/${
              r.result.slug || '~kg/' + encodeURIComponent(r.result['@id'])
            }`}
            passHref
          >
            <a
              className={c(
                'relative grid w-full grid-cols-10 items-stretch overflow-hidden bg-white lg:border-x lg:border-t',
                { 'opacity-[80%]': !r.result.slug && hasHvResults },
              )}
            >
              <div className="col-span-2 overflow-hidden lg:border-b">
                <Image
                  src={r.result.image?.contentUrl}
                  layout="responsive"
                  objectFit="cover"
                  objectPosition="center"
                  width={150}
                  height={150}
                  alt={r.result.name}
                />
              </div>
              <div className="align-center col-span-8 flex h-full flex-col justify-center border-b px-5">
                <p className="truncate text-lg font-semibold">
                  {r.result.name}
                </p>
                <p className="text-xs text-gray-500 xs:text-base">
                  {r.result.description}
                </p>
              </div>
              {!r.result.slug && (
                <div className="absolute right-0 top-1 bottom-1 my-auto mr-[3%] flex flex-col justify-center bg-gradient-to-r from-transparent via-white to-white pl-24">
                  <div className="rounded-full border border-gray-300 bg-white px-5 py-1 text-xs text-gray-500 xs:text-sm">
                    Request
                  </div>
                </div>
              )}
            </a>
          </Link>
        );
      })}
    </div>
  );
}
