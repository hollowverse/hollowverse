export type TNotablePersonYaml = {
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

export type NotablePersonProps = {
  slug: TSlug;
  notablePersonYaml: TNotablePersonYaml;
  notablePersonMd: TNotablePersonMd;
  pic: TPic;
};
