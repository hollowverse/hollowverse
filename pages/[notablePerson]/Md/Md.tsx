import { Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import StarsIcon from '_i/icons/stars.svg';
import { Icon } from '_r/pages/common/Icon';
import { NotablePersonProps } from '_r/pages/[notablePerson].page';
import s from '../notablePerson.module.scss';
import { Article } from './Article/Article';
import { InterestingProfiles } from './InterestingProfiles/InterestingProfiles';
import { Sources } from './Sources/Sources';

export const Md = (p: NotablePersonProps) => {
  const [showSources, setShowSources] = useState(false);

  if (!p.notablePersonMd) {
    return null;
  }

  return (
    <Container
      maxWidth="md"
      className={s.editorialContainer}
      component="section"
    >
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

      <div className={s.interestingProfilesContainer}>
        <Typography variant="h1" component="h3">
          <Icon component={StarsIcon} />
          Other interesting profiles
        </Typography>

        <div className={s.interestingProfiles}>
          <InterestingProfiles
            relatedPeople={p.notablePersonMd.data.relatedPeople}
          />
        </div>
      </div>
    </Container>
  );
};
