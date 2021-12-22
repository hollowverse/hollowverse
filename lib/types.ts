export type TNotablePersonData = {
  id: string;
  name: string;
  born: string;
  attributes: string[];
  occupations: string[];
  quotes: [string, string, string, string][];
  'discourse-topic-id': number;
};

export type TAttribute = {
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
