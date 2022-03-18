export type TCeleb = {
  id: string;
  name: string;
  discourseTopicId: number;
};

export type TTag = {
  text: string;
  icon: string;
  alt: string;
};

export type TPic = string;

export type TSlug = string;

export type TCelebOldContent = {
  sources: { sourceUrl: string; sourceTitle: string }[];
  relatedPeople: {
    slug: TSlug;
    pic: TPic;
    name: string;
  }[];
  summaries?: {
    religion: string;
    politicalViews: string;
  };
  article: string;
};

export type CelebProps = {
  slug: TSlug;
  celeb: TCeleb;
  celebOldContent: TCelebOldContent;
  pic: TPic;
};
