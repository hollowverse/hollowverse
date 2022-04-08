import {
  SanityImageObject,
  SanityImageSource,
} from '@sanity/image-url/lib/types/types';

export type TSlug = string;

export type Topic = string;

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

export type RawFact = Omit<Fact, 'topics'> & {
  topics: { name: string }[];
};

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

export type TCeleb = {
  wikipediaId: string;
  name: string;
  slug: TSlug;
  picture: TPicture;
  discourseTopicId: number;
  tags?: {
    regular: Tag[];
    lowConfidence: Tag[];
  };
  oldContent?: TCelebOldContent;
  facts?: OrderedFacts;
};

export type CelebPageProps = {
  celeb: TCeleb;
  placeholderImage: SanityImageSource;
};
