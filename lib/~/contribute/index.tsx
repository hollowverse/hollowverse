import EditIcon from '@mui/icons-material/Edit';
import ForumIcon from '@mui/icons-material/Forum';
import PersonIcon from '@mui/icons-material/Person';
import WifiIcon from '@mui/icons-material/Wifi';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { Button, Container, Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { getContributeLink } from '~/lib/components/getContributeLink';
import { Heading2 } from './Heading2';
import s from './styles.module.scss';
import Head from 'next/head';

export const Contribute = () => {
  const router = useRouter();
  const name = router.query.name;
  const href = getContributeLink(name as string);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <Container className={s.Contribute} maxWidth="md">
        <Typography variant="h1">Add to {name}&apos;s page</Typography>

        <Typography>
          To show our appreciation for your contributions, we are offering a $25
          Amazon® gift card to each of the <strong>3 most active</strong>{' '}
          contributors to Hollowverse.
        </Typography>

        <Typography>
          We are collecting new facts about {name}&apos;s religion, politics,
          and social views. If you know something about {name}, you can share it
          by posting on the discussion board. Here&apos;s some quick details...
        </Typography>

        <Heading2 icon={<PersonIcon />}>First create an account</Heading2>

        <Typography>
          There&apos;s a button at the bottom that will open the Hollowverse
          discussion board. If this is your first time, you will be asked to
          sign-up.
        </Typography>

        <Heading2 icon={<ForumIcon />}>Then submit a post</Heading2>

        <Typography>
          After you complete the sign-up and verify your email address, the text
          editor will be displayed. That&apos;s where you can submit the
          content.
        </Typography>

        <Typography>
          The text editor will be pre-filled with some information to give you a
          bit more help with the process. When you&apos;re finished, submit the
          post.
        </Typography>

        <Heading2 icon={<WifiIcon />}>Wait for your post to go live</Heading2>

        <Typography>
          After you submit the post, a moderator will validate that everything
          looks good then we will publish the information on {name}
          &apos;s page. And we will give you credit for the contribution!
        </Typography>

        <Heading2 icon={<CelebrationIcon />}>
          Top contributors receive a gift card
        </Heading2>

        <Typography>
          At the end of each month, we tally up contributor posts across all
          pages. The 3 contributors with the most posts receive a $25 Amazon®
          gift card each.
        </Typography>

        <Typography>
          Thanks for contributing! The thousands of readers that visit
          Hollowverse everyday will appreciate it!
        </Typography>

        <Typography>
          Now you can go to the discussion board to tell us what you know about{' '}
          {name}!
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
          <Link href="mailto:hollowverse@hollowverse.com">email us</Link>.
          We&apos;d be happy to hear from you!
        </p>
      </Container>
    </>
  );
};
