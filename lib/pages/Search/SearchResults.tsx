import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { c } from '~/lib/pages/utils/c';

export function SearchResults(params: { results: any; hasHvResults: boolean }) {
  const { results, hasHvResults } = params;

  return (
    <div className="grid w-full lg:my-5 lg:gap-5">
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
                'relative grid w-full grid-cols-10 overflow-hidden border-b bg-white lg:border-x lg:border-t',
                { 'opacity-[80%]': !r.result.slug && hasHvResults },
              )}
            >
              <div className="col-span-2">
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
              <div className="align-center relative col-span-8 flex flex-col justify-center px-5">
                <p className="truncate text-lg font-semibold">
                  {r.result.name}
                </p>
                <p className="text-xs text-gray-500 xs:text-base">
                  {r.result.description}
                </p>
              </div>
              {!r.result.slug && (
                <div className="absolute top-5 bottom-5 right-0 my-auto mr-[3%] flex h-[99%] flex-col justify-center bg-gradient-to-r from-transparent via-white to-white pl-24">
                  <div className="rounded-full border border-gray-300 bg-white px-5 py-1 text-xs text-gray-500 transition hover:border-gray-400 hover:text-gray-600 active:border-gray-500 active:text-gray-700 xs:text-sm">
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
