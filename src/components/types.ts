import {
  SanityImageObject,
  SanityImageSource,
} from '@sanity/image-url/lib/types/types';

export type TSlug = string;

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
  oldContent?: TCelebOldContent;
};

export type TTag = {
  text: string;
  icon: string;
  alt: string;
};

export type CelebPageProps = {
  celeb: TCeleb;
  placeholderImage: SanityImageSource;
};
