import { Container } from '@mui/material';
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
    <Container maxWidth="md" component="section" style={{ marginTop: 32 }}>
      <Article
        notablePersonMd={p.notablePersonMd}
        setShowSources={setShowSources}
      />

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
