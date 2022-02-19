import { Container, Link, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNotablePersonContext } from '~/components/StaticPropsContextProvider';
import { Article } from './Article/Article';
import { InterestingProfiles } from './InterestingProfiles/InterestingProfiles';
import { Sources } from './Sources/Sources';

export const Md = () => {
  const [showSources, setShowSources] = useState(false);
  const context = useNotablePersonContext();

  return (
    <Container maxWidth="md" component="section" disableGutters>
      {(context.notablePersonMd.content && (
        <Article setShowSources={setShowSources} />
      )) || (
        <div>
          <Typography variant="h4" component="p">
            Share what you know about {context.notablePersonYaml.name} in the{' '}
            <Link href="#discussion">discussion forum</Link> below!
          </Typography>
        </div>
      )}

      {context.notablePersonMd.data?.sources?.length > 0 && (
        <Sources showSources={showSources} setShowSources={setShowSources} />
      )}

      <InterestingProfiles />
    </Container>
  );
};
