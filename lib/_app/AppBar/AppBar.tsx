import {
  AppBar as MuiAppBar,
  Container,
  IconButton,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';
import { featureFlags } from '~/lib/components/featureFlags';
import { Icon } from '~/lib/components/Icon';
import SearchIcon from '~/public/images/icons/search-regular.svg';
import TimesIcon from '~/public/images/icons/times-regular.svg';
import s from './AppBar.module.scss';

export const Logo: React.FC<{ showSearch?: boolean }> = ({ showSearch }) => {
  return (
    <div className={s.logo}>
      <div style={{ display: showSearch ? 'block' : 'none' }}>
        <div title="Google search results" className="gcse-search" />
      </div>

      <div style={{ display: showSearch ? 'none' : 'block' }}>
        <Link passHref href="/">
          <a>
            <Image
              src="/images/logo.svg"
              width={250}
              height={30}
              alt="Hollowverse"
            />
            <Typography variant="body2" className={s.subtitle}>
              Important people and facts
            </Typography>
          </a>
        </Link>
      </div>
    </div>
  );
};

export const SearchButton: React.FC<{
  render?: (showSearch: boolean) => ReactElement;
}> = (p) => {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      {p.render && p.render(showSearch)}

      {(featureFlags.newSearch && (
        <div className={s.search}>
          <Link
            href={{
              pathname: '/~search',
              query: {
                previousUrl: router.pathname,
              },
            }}
          >
            Search
          </Link>
        </div>
      )) || (
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
      )}
    </>
  );
};

export const AppBar: React.FC = (props) => {
  return (
    <MuiAppBar
      elevation={1}
      color="transparent"
      position="static"
      className={s.AppBar}
    >
      <Container maxWidth="md" className={s.container}>
        {props.children || (
          <SearchButton
            render={(showSearch) => <Logo showSearch={showSearch} />}
          />
        )}
      </Container>
    </MuiAppBar>
  );
};
