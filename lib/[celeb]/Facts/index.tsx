import React from 'react';
import { Separator } from '~/lib/components/Separator';
import { useCelebContext } from '~/lib/components/StaticPropsContextProvider';
import { Fact } from '~/lib/[celeb]/Facts/Fact';
import s from './styles.module.scss';

export const Facts = () => {
  const context = useCelebContext();
  const { facts, topics } = context.celeb.facts!;

  return (
    <div className={s.Facts}>
      {topics.map(([topic, factIndexes], i) => {
        return (
          <div key={`${topic}-${i}`}>
            <Separator title={topic} className={s.separator} />

            {factIndexes.map((factIndex, i) => {
              return (
                <div key={`${factIndex}-${i}`}>
                  <Fact key={factIndex} value={facts[factIndex]} />
                  {i !== factIndexes.length - 1 && (
                    <Separator minor className={s.minorSeparator} />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
