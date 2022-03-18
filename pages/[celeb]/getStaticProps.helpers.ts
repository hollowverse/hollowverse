import yml from 'js-yaml';
import fs from 'fs-extra';
import { celebsPath, publicDir } from '~/pages/[celeb]/paths';
import { join } from 'path';
import { TCelebYaml } from '~/pages/components/types';
import matter from 'gray-matter';

export const withPubDir = (s: string) => `${publicDir}/${s}`;

export const getImageLink = (celebId: string) => {
  const link = `/images/celebs/${celebId}`;

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

export const loadCelebYaml = (slug: string) =>
  yml.load(
    fs.readFileSync(join(celebsPath, slug, `${slug}.yaml`), 'utf8'),
  ) as TCelebYaml;

export const loadCelebMd = (slug: string) =>
  matter(fs.readFileSync(join(celebsPath, slug, `${slug}.md`)));
