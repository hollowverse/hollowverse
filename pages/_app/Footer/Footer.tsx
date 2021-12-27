import React from 'react';
import Image from 'next/image';
import { Icon } from '_r/pages/common/Icon';
import InfoCircle from '_i/icons/info-circle.svg';
import CommentDots from '_i/icons/comment-dots.svg';
import GiftIcon from '_i/icons/gift.svg';
import s from '../_app.module.scss';
import { Link, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.footerImage}>
        <Image
          width={50}
          height={50}
          alt="Hollowverse"
          src="/images/icons/letter-logo.png"
        />
      </div>
      <div className={s.footerItems}>
        {(
          [
            [
              InfoCircle,
              <>About</>,
              <>Hollowverse is about the important people and their beliefs.</>,
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
    </footer>
  );
};
