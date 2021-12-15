import { ImageDataLike } from 'gatsby-plugin-image';

export type NotablePersonData = {
  slug: string;
  name: string;
  attributes: string[];
  quotes: [string, string, string][];
  'editorial-sources'?: [string, string][];
};

export type Pic = ImageDataLike;

export type InterestingProfiles = [NotablePersonData, Pic][];
