import React, { useEffect, useState } from 'react';

export const HowToContribute = ({ howToContributeHtml }: any) => {
  const [hasReadInstructions, setHasReadInstructions] = useState(null);

  useEffect(() => {
    const hasReadInstructionsLocalStorage = JSON.parse(
      localStorage.getItem('hasReadInstructions') as any,
    );

    setHasReadInstructions(hasReadInstructionsLocalStorage);
  }, [howToContributeHtml]);

  return (
    (hasReadInstructions && <div>Has read instructions</div>) || (
      <div
        dangerouslySetInnerHTML={{
          __html: howToContributeHtml,
        }}
      />
    )
  );
};

export { getStaticProps } from './getStaticProps';

export default HowToContribute;
