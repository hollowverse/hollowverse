import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Fact } from '~/lib/groq/fact.partial.groq';
import { PictureGroq } from '~/lib/groq/picture.partial.groq';

type TSlug = string;

// export type Tag = {
//   isLowConfidence: boolean | null;
//   tag: {
//     name: string;
//     topic: {
//       name: string;
//     };
//   };
// };

// export type TPicture = SanityImageObject & {
//   metadata: {
//     lqip: string;
//   };
// };

// export type TCelebGalleryItem = {
//   slug: TSlug;
//   picture: TPicture;
//   name: string;
// };

// export type TCelebOldContent = {
//   sources: { sourceUrl: string; sourceTitle: string }[];
//   relatedPeople: TCelebGalleryItem[];
//   summaries?: {
//     religion: string;
//     politicalViews: string;
//   };
//   article: string;
// };

// export type TCeleb = {
//   wikipediaId: string;
//   name: string;
//   slug: TSlug;
//   picture?: TPicture;
//   tags: Tag[];
//   oldContent?: TCelebOldContent;
//   // facts?: OrderedFacts;
//   facts: GroupedFacts;
// };

// export type CelebPageProps = {
//   celeb: TCeleb;
// };

export type FactPageProps = {
  celeb: {
    name: string;
    slug: TSlug;
    picture: PictureGroq;
  };
  fact: Fact;
  placeholderImage: SanityImageSource;
};
