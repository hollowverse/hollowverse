import React from 'react';
import Link from 'next/link';
import { useCelebContext } from '~/lib/pages/components/StaticPropsContextProvider';
import { Fact as TFact } from '~/lib/pages/utils/types';
import { Tag } from '~/lib/pages/Celeb/Tag';

export const Fact: React.FC<{ value: TFact }> = ({ value }) => {
  const {
    celeb: { name },
  } = useCelebContext();

  return (
    <section aria-label="Celebrity Fact" className="p-5">
      <div className="mb-5 flex flex-wrap gap-2.5">
        {value.tags.map((t) => {
          return (
            <Tag key={t.tag.name}>
              <span className="text-neutral-500">
                # {t.isLowConfidence && 'Possibly '}
                {t.tag.name}
              </span>
            </Tag>
          );
        })}
      </div>

      <div>
        {(value.type === 'quote' && (
          <div>
            <p>
              {value.context}, {name} said
            </p>

            <blockquote className="mb-0 block border-l-4 border-blue-400 bg-blue-50">
              {value.quote}
            </blockquote>
          </div>
        )) ||
          (value.type == 'fact' && <p>{value.content}</p>)}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-xs text-neutral-500">{value.date}</p>

        <div className="flex gap-2.5 text-sm text-neutral-500">
          <Link href={value.source}>
            <a className="cursor-pointer select-none rounded-lg border-[3.5px] border-white bg-gray-100 px-3.5 py-2 text-xs text-neutral-500 no-underline transition hover:text-black focus:border-blue-300 active:bg-gray-200">
              Source
            </a>
          </Link>

          <Link href={value.forumLink}>
            <a className="cursor-pointer select-none rounded-lg border-[3.5px] border-white bg-gray-100 px-3.5 py-2 text-xs text-neutral-500 no-underline transition hover:text-black focus:border-blue-300 active:bg-gray-200">
              Forum link
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};
