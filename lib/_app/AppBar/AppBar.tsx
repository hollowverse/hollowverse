import {
  AppBar as MuiAppBar,
  Container,
  IconButton,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Image from 'next/image';
import { Icon } from '~/lib/components/Icon';
import SearchIcon from '~/public/images/icons/search-regular.svg';
import TimesIcon from '~/public/images/icons/times-regular.svg';
import s from './AppBar.module.scss';
import Link from 'next/link';

export const AppBar = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <MuiAppBar
      elevation={1}
      color="transparent"
      position="static"
      className={s.AppBar}
    >
      <Container maxWidth="md" className={s.container}>
        <div className={s.logo}>
          <div style={{ display: showSearch ? 'block' : 'none' }}>
            <div title="Google search results" className="gcse-search" />
          </div>

          <div style={{ display: showSearch ? 'none' : 'block' }}>
            <Link passHref href="/">
              <Image
                src="/images/logo.svg"
                width={250}
                height={30}
                alt="Hollowverse"
              />
              <Typography variant="body2" className={s.subtitle}>
                Important people and facts
              </Typography>
            </Link>
          </div>
        </div>

        <div className={s.search}>
          <IconButton
            aria-label="Search"
            onClick={() => setShowSearch(!showSearch)}
            style={{ opacity: showSearch ? 0.5 : 1 }}
          >
            <Icon
              component={showSearch ? TimesIcon : SearchIcon}
              fontSize="large"
            />
          </IconButton>
        </div>
      </Container>
    </MuiAppBar>
  );
};
/*
const _ = require('lodash')

const fact = {a: 'stuff'}

const goal = [
  ['issue', [fact, fact, fact]],
  ['issue', [fact, fact, fact]],
]

export const factsDataTransform = (facts, orderOfIssues) => {
  const orderedFacts = facts.sort((a, b) => {
    return orderOfIssues.indexOf(a.issue) - orderOfIssues.indexOf(b.issue);
  });


};
*/
