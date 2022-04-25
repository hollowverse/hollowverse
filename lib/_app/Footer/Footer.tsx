import { Container, Divider, Link, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { Icon } from '~/lib/components/Icon';
import CommentDots from '~/public/images/icons/comment-dots.svg';
import InfoCircle from '~/public/images/icons/info-circle.svg';
import GiftIcon from '~/public/images/icons/gift.svg';
import s from './Footer.module.scss';
import { Separator } from '~/lib/components/Separator';

export const Footer = () => {
  return (
    <footer className={s.Footer}>

      <Container maxWidth="md" className={s.content}>
        <div className="pt-28 pb-10 flex flex-col items-center justify-center w-full h-auto">
          <Image
            width={50}
            height={50}
            alt="Hollowverse"
            src="/images/icons/letter-logo.png"
          />

          <Typography className="font-primary text-[#747474] text-base mt-4 text-center" variant="h4" component="p">
           Hollowverse is about the important <br />people and their beliefs.
          </Typography>

          <div className="mt-6">
            <Typography className="font-primary text-[#747474] text-sm mt-4 text-center" variant="h4" component="p">
              Email us at <a href="mailto:hollowverse@hollowverse.com" className="text-black font-medium">hollowverse@hollowverse.com</a>.
            </Typography>
          </div>
        </div>
      </Container>
    </footer>
  );
};
