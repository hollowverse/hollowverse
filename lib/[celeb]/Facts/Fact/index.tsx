import React from 'react';
import Link from 'next/link';
import { useCelebContext } from '~/lib/components/StaticPropsContextProvider';
import { Fact as TFact } from '~/lib/components/types';

export const Fact: React.FC<{ value: TFact }> = ({ value }) => {
  const {
    celeb: { name },
  } = useCelebContext();

  return (
    <section
      aria-label="Celebrity Fact"
      className="flex flex-col border-b bg-white !p-5 lg:border-x"
    >
      <div className="mb-5 flex flex-wrap gap-2.5">
        {value.tags.map((t) => {
          return (
            <div
              className="inline-flex rounded-full bg-gray-100 px-3.5 py-2 text-xs text-neutral-500"
              key={t.tag.name}
            >
              # {t.isLowConfidence && 'Possibly '}
              {t.tag.name}
            </div>
          );
        })}
      </div>
      <div className="">
        {(value.type === 'quote' && (
          <div className="">
            <div className="">
              {value.context}, {name} said
            </div>

            <blockquote className="block mb-0 border-l-4 border-blue-400 bg-blue-50">
              <div>{value.quote}</div>
            </blockquote>
          </div>
        )) ||
          (value.type == 'fact' && (
            <div className="">
              <div>{value.content}</div>
            </div>
          ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="text-xs text-neutral-500">{value.date}</div>
        <div className="flex gap-2.5 text-sm text-neutral-500">
          <Link href={value.source}>
            <button className="cursor-pointer select-none rounded-lg border-[3.5px] border-white bg-gray-100 px-3.5 py-2 text-xs text-neutral-500 no-underline transition hover:text-black focus:border-blue-300 active:bg-gray-200">
              Source
            </button>
          </Link>
          <Link href={value.forumLink}>
            <button className="cursor-pointer select-none rounded-lg border-[3.5px] border-white bg-gray-100 px-3.5 py-2 text-xs text-neutral-500 no-underline transition hover:text-black focus:border-blue-300 active:bg-gray-200">
              Forum link
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
