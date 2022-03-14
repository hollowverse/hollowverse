import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';
import s from './contribute.module.scss';
import PersonIcon from '@mui/icons-material/Person';
import { Heading2 } from './Heading2';
import ForumIcon from '@mui/icons-material/Forum';
import WifiIcon from '@mui/icons-material/Wifi';
import { getContributeLink } from '~/pages/components/getContributeLink';

export const HowToContribute = () => {
  const router = useRouter();
  const name = router.query.name;
  const slug = router.query.slug;
  const href = getContributeLink(name as string);

  return (
    <Container className={s.HowToContribute} maxWidth="md">
      <Typography variant="h1">Add info about {name}</Typography>

      <Typography>
        Thanks for wanting to contribute to {name}&apos;s page! Thousands of
        people read Hollowverse everyday. I&apos;m sure they&apos;ll appreciate
        your contribution!
      </Typography>

      <Typography>
        Let me explain a few things then you&apos;ll be on your way!
      </Typography>

      <Heading2 icon={<PersonIcon />}>Create an account</Heading2>

      <Typography>
        There&apos;s a button at the bottom that will open the Hollowverse
        discussion board. If you&apos;re a first-time contributor, you will be
        asked to sign-up because you need to have a user account to contribute.
      </Typography>

      <Heading2 icon={<ForumIcon />}>Submit a post</Heading2>

      <Typography>
        After you complete the sign-up and verify your email address, the text
        editor will be displayed. That&apos;s where you can add information. If
        the text editor didn&apos;t open, go back to{' '}
        <a href={`/${slug}`}>{name}&apos;s page</a> and click on the &quot;Add
        info&quot; button again.
      </Typography>

      <Typography>
        The text editor will be pre-filled with some information to give you a
        bit more help with the process. Go ahead and add your stuff then submit
        the post.
      </Typography>

      <Heading2 icon={<WifiIcon />}>Your post goes live</Heading2>

      <Typography>
        After you submit the post, one of our team members will validate that
        everything looks good and we will publish the information on {name}
        &apos;s page. And we will give you credit for the contribution!
      </Typography>

      <Typography>
        Thanks again for wanting to contribute. I&apos;m sure thousands of
        readers will appreciate it!
      </Typography>

      <Typography>
        Now you can go to the discussion board to add info about {name}!
      </Typography>

      <div className={s.openDiscussionBoardButton}>
        <Button
          variant="outlined"
          endIcon={<EditIcon />}
          onClick={() => {
            localStorage.setItem('hasReadInstructions', JSON.stringify(true));
            router.push(href);
          }}
        >
          Open discussion board
        </Button>
      </div>

      <p>
        If you need more help,{' '}
        <a href="mailto:hollowverse@hollowverse.com">email us</a>. We&apos;d be
        happy to hear from you!
      </p>
    </Container>
  );
};

export default HowToContribute;
