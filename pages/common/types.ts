export type TNotablePersonData = {
  id: string;
  name: string;
  slug: string;
  // born: string;
  // tags: string[];
  // occupations: string[];
  // quotes: [string, string, string, string][];
  // 'discourse-topic-id': number;
};

export type TTag = {
  text: string;
  icon: string;
  alt: string;
};

export type TPic = string;

export type TEditorial = {
  data: {
    sources: { sourceUrl: string; sourceTitle: string }[];
    interestingProfiles: TNotablePersonData[];
  };
  content: string;
};
