export type TNotablePersonData = {
  id: string;
  name: string;
  born: string;
  tags: string[];
  occupations: string[];
  quotes: [string, string, string, string][];
  'discourse-topic-id': number;
};

export type TTag = {
  text: string;
  icon: string;
  alt: string;
};

export type TPic = string;

export type TEditorial = {
  data: {
    sources: [string, string][];
    interestingProfiles: TNotablePersonData[];
  };
  content: string;
};
