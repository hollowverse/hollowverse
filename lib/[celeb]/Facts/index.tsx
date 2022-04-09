import React from 'react';
import { Separator } from '~/lib/components/Separator';
import { useCelebContext } from '~/lib/components/StaticPropsContextProvider';
import { Fact } from '~/lib/[celeb]/Facts/Fact';
import s from './styles.module.scss';

export const Facts = () => {
  const context = useCelebContext();
  const { groups, topics } = context.celeb.facts!;

  return (
    <div className={s.Facts}>
      {topics.map((topic, i) => {
        const factGroup = groups[topic];

        return (
          <div key={`${topic}-${i}`}>
            <Separator title={topic} className={s.separator} />

            {factGroup.map((fact, innerI) => {
              return (
                <div key={`${topic}-${i}-${innerI}`}>
                  <Fact value={fact} />
                  {i !== factGroup.length - 1 && (
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
