export type TCelebYaml = {
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

export type TCelebMd = {
  data: {
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
  };
  content: string;
};

export type CelebProps = {
  slug: TSlug;
  celebYaml: TCelebYaml;
  celebMd: TCelebMd;
  pic: TPic;
};
