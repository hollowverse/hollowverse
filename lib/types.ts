export type TNotablePersonData = {
  id: string;
  name: string;
  born: string;
  attributes: string[];
  occupations: string[];
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
