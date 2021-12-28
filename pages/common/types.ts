export type TNotablePersonYaml = {
  id: string;
  name: string;
};

export type TTag = {
  text: string;
  icon: string;
  alt: string;
};

export type TPic = string;

export type TSlug = string;

export type TNotablePersonMd = {
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
