export type NotablePersonData = {
  slug: string;
  name: string;
  attributes: string[];
  quotes: [string, string, string][];
  'editorial-sources'?: [string, string][];
};

export type Pic = any;

export type InterestingProfiles = [NotablePersonData, Pic][];
