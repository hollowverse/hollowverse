import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { Tag } from '~/components/Tag';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';

export const TagCollection = (props: CelebPageProps) => {
  const tags = props.celeb.tags;

  return (
    <div className="mx-auto flex flex-wrap justify-center gap-2.5">
      {tags.map((t, val) => (
        <Tag key={val}>
          {t.tag.name}
          {t.isLowConfidence && (
            <FaQuestionCircle className="self-center text-xs text-neutral-400" />
          )}
        </Tag>
      ))}
    </div>
  );
};
