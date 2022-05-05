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
    <footer className={s.Footer + " " + "border-t"}>

      <Container maxWidth="md" className={s.content}>
        <div className={s.image}>
          <Image
            width={50}
            height={50}
            alt="Hollowverse"
            src="/images/icons/letter-logo.png"
          />
        </div>

        <div className={s.items}>
          {(
            [
              [
                InfoCircle,
                <>About</>,
                <>
                  Hollowverse is about the important people and their beliefs.
                </>,
              ],
              [
                CommentDots,
                <>Contact</>,
                <>
                  Email us at{' '}
                  <Link
                    rel="noopener"
                    href="mailto:hollowverse@hollowverse.com"
                    target="_blank"
                    color="inherit"
                  >
                    hollowverse@hollowverse.com
                  </Link>
                  .
                </>,
              ],
              [
                GiftIcon,
                <>Copyrights</>,
                <>
                  We reserve none. Everything here is free, including{' '}
                  <Link
                    href="https://github.com/hollowverse/"
                    target="_blank"
                    color="inherit"
                    rel="noopener"
                  >
                    the code
                  </Link>
                  .
                </>,
              ],
            ] as const
          ).map(([IconComponent, title, text], i) => {
            return (
              <div key={i}>
                <Typography variant="h4" component="p">
                  <Icon component={IconComponent} style={{ fontSize: 17 }} />{' '}
                  {title}
                </Typography>

                <Typography variant="body1">{text}</Typography>
              </div>
            );
          })}
        </div>
      </Container>

      <div style={{ marginTop: '100px' }} />
    </footer>
  );
};
