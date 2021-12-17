import matter from 'gray-matter';

export type TNotablePersonData = {
  id: string;
  name: string;
  attributes: string[];
  quotes: [string, string, string][];
};

export type TPic = string;

export type TEditorial = {
  data: {
    sources: [string, string][];
    interestingProfiles: TNotablePersonData[];
  };
  content: string;
};
