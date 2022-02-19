import { Container, Link, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NotablePersonProps } from '~/pages/[notablePerson].page';
import { Article } from './Article/Article';
import { InterestingProfiles } from './InterestingProfiles/InterestingProfiles';
import { Sources } from './Sources/Sources';

export const Md = (p: NotablePersonProps) => {
  const [showSources, setShowSources] = useState(false);

  if (!p.notablePersonMd) {
    return null;
  }

  return (
    <Container maxWidth="md" component="section" disableGutters>
      {(p.notablePersonMd.content && (
        <Article
          notablePersonMd={p.notablePersonMd}
          setShowSources={setShowSources}
        />
      )) || (
        <div>
          <Typography variant="h4" component="p">
            Share what you know about {p.notablePersonYaml.name} in the{' '}
            <Link href="#discussion">discussion forum</Link> below!
          </Typography>
        </div>
      )}

      {p.notablePersonMd.data?.sources?.length > 0 && (
        <Sources
          showSources={showSources}
          notablePersonMd={p.notablePersonMd}
          setShowSources={setShowSources}
        />
      )}

      <InterestingProfiles
        relatedPeople={p.notablePersonMd.data.relatedPeople}
      />
    </Container>
  );
};
