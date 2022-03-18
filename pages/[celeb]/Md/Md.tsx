import { Container, Link, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useCelebContext } from '~/pages/components/StaticPropsContextProvider';
import { Article } from './Article/Article';
import { InterestingProfiles } from './InterestingProfiles/InterestingProfiles';
import { Sources } from './Sources/Sources';

export const Md = () => {
  const [showSources, setShowSources] = useState(false);
  const context = useCelebContext();

  return (
    <section>
      {(context.celebOldContent.article && (
        <Article setShowSources={setShowSources} />
      )) || (
        <Container maxWidth="md" style={{ marginTop: 40, marginBottom: 40 }}>
          <Typography variant="h4" component="p">
            Share what you know about {context.celeb.name} in the{' '}
            <Link href="#discussion">discussion forum</Link> below!
          </Typography>
        </Container>
      )}

      {context.celebOldContent.sources?.length > 0 && (
        <Sources showSources={showSources} setShowSources={setShowSources} />
      )}

      <InterestingProfiles />
    </section>
  );
};
