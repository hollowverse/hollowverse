import yml from 'js-yaml';
import fs from 'fs-extra';
import { notablePeoplePath, publicDir } from '~/pages/[notablePerson]/paths';
import { join } from 'path';
import { TNotablePersonYaml } from '../common/types';
import matter from 'gray-matter';

export const withPubDir = (s: string) => `${publicDir}/${s}`;

export const getImageLink = (notablePersonId: string) => {
  const link = `/images/notablePeople/${notablePersonId}`;

  const jpg = `${link}.jpg`;
  const jpeg = `${link}.jpeg`;
  const png = `${link}.png`;

  return fs.existsSync(withPubDir(jpg))
    ? jpg
    : fs.existsSync(withPubDir(jpeg))
    ? jpeg
    : fs.existsSync(withPubDir(png))
    ? png
    : '';
};

export const loadNotablePersonYaml = (slug: string) =>
  yml.load(
    fs.readFileSync(join(notablePeoplePath, slug, `${slug}.yaml`), 'utf8'),
  ) as TNotablePersonYaml;

export const loadNotablePersonMd = (slug: string) =>
  matter(fs.readFileSync(join(notablePeoplePath, slug, `${slug}.md`)));
