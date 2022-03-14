import EditIcon from '@mui/icons-material/Edit';
import ForumIcon from '@mui/icons-material/Forum';
import PersonIcon from '@mui/icons-material/Person';
import WifiIcon from '@mui/icons-material/Wifi';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { getContributeLink } from '~/pages/components/getContributeLink';
import s from './styles.module.scss';
import { Heading2 } from './Heading2';

export const HowToContribute = () => {
  const router = useRouter();
  const name = router.query.name;
  const slug = router.query.slug;
  const href = getContributeLink(name as string);

  return (
    <Container className={s.HowToContribute} maxWidth="md">
      <Typography variant="h1">Edit {name}&apos;s page</Typography>

      <Typography>
        Contributing to Hollowverse is as easy as posting to a discussion board
        because that&apos;s actually how it works! Let me just very briefly give
        you a few more details...
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
        editor will be displayed. That&apos;s where you can submit the content.
      </Typography>

      <Typography>
        The text editor will be pre-filled with some information to give you a
        bit more help with the process. When you&apos;re finished, submit the
        post.
      </Typography>

      <Heading2 icon={<WifiIcon />}>Wait for your post to go live</Heading2>

      <Typography>
        After you submit the post, one of our team members will validate that
        everything looks good then we will publish the information on {name}
        &apos;s page. And we will give you credit for the contribution!
      </Typography>

      <Typography>
        Thanks for wanting to contribute. The thousands of readers that visit
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
        <a href="mailto:hollowverse@hollowverse.com">email us</a>. We&apos;d be
        happy to hear from you!
      </p>
    </Container>
  );
};

export default HowToContribute;
