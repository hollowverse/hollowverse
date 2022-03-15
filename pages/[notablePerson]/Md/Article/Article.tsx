import { Button, Container, Grid } from '@mui/material';
import React from 'react';
import { Separator } from '~/pages/components/Separator';
import { useNotablePersonContext } from '~/pages/components/StaticPropsContextProvider';
import s from './styles.module.scss';
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link';

export const Article = (p: {
  setShowSources: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const context = useNotablePersonContext();

  return (
    <article
      className={s.Article}
      onClick={(e) => {
        if ((e.target as Element).classList.contains('source-citation')) {
          p.setShowSources(true);
        }
      }}
    >
      {context.notablePersonMd.data.summaries && (
        <div>
          <Separator title="Summary" className={s.separator} />
          <Container maxWidth="md">
            <p>{context.notablePersonMd.data.summaries.religion}</p>
            <p>{context.notablePersonMd.data.summaries.politicalViews}</p>
          </Container>
        </div>
      )}

      <div className={s.contributePromo}>
        <Separator
          title="Hi! 👋 Do you think a lot about politics and religion? 🧠"
          className={s.separator}
        />
        <Container maxWidth="md" className={s.contributePromoContent}>
          <div className={s.contributePromoText}>
            <p>
              Receive a $25 Amazon® gift card by becoming a top contributor on
              Hollowverse!
            </p>
          </div>

          <div className={s.contributePromoButtonContainer}>
            <Link
              aria-label="Learn about the steps required to start contributing to Hollowverse"
              href={{
                pathname: '/~/contribute',
                query: {
                  name: context.notablePersonYaml.name,
                  slug: context.slug,
                },
              }}
              passHref
            >
              <Button
                aria-label="Learn about the steps required to start contributing to Hollowverse"
                endIcon={<LoginIcon />}
              >
                Learn more
              </Button>
            </Link>
          </div>
        </Container>
      </div>

      <Separator title="Editorial" className={s.separator} />
      <Container
        maxWidth="md"
        dangerouslySetInnerHTML={{ __html: context.notablePersonMd.content }}
      />
    </article>
  );
};
