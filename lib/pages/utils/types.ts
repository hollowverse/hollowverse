import {
  SanityImageObject,
  SanityImageSource,
} from '@sanity/image-url/lib/types/types';
import { Dictionary } from 'lodash';

export type TSlug = string;

export type Topic = { name: string };

export type Tag = {
  isLowConfidence: boolean | null;
  tag: {
    name: string;
    topic: {
      name: string;
    };
  };
};

export type Fact = {
  dateAdded: string;
  date: string;
  source: string;
  forumLink: string;
  topics: Topic[];
  tags: Tag[];
} & (
  | {
      type: 'quote';
      context: string;
      quote: string;
    }
  | {
      type: 'fact';
      content: string;
    }
);

// export type OrderedFacts = [string, Fact[]][];
export type OrderedFacts = {
  facts: Fact[];
  topics: [string, number[]][];
};

export type TPicture = SanityImageObject & {
  metadata: {
    lqip: string;
  };
};

export type TCelebGalleryItem = {
  slug: TSlug;
  picture: TPicture;
  name: string;
};

export type TCelebOldContent = {
  sources: { sourceUrl: string; sourceTitle: string }[];
  relatedPeople: TCelebGalleryItem[];
  summaries?: {
    religion: string;
    politicalViews: string;
  };
  article: string;
};

/**
 * We have groups of Facts, keyed by their topics. I.e.
 *
 * {
 *  religion: Fact[]
 * }
 *
 * An object is not sorted. But we need the topics to be sorted because they are ranked
 * by importance. So we also have a `topics` array for that purpose.
 *
 * When we want to iterate over `groups` by importance, we usually go by the order which
 * appears in the `topics` array.
 */
export type GroupedFacts = {
  groups: Dictionary<Fact[]>;
  topics: string[];
};

export type TCeleb = {
  wikipediaId: string;
  name: string;
  slug: TSlug;
  picture: TPicture;
  tags: Tag[];
  oldContent?: TCelebOldContent;
  // facts?: OrderedFacts;
  facts: GroupedFacts;
};

export type CelebPageProps = {
  celeb: TCeleb;
  placeholderImage: SanityImageSource;
};
