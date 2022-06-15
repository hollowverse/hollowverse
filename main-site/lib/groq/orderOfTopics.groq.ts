import groq from 'groq';

export type OrderOfIssues = string[];

export const orderOfIssuesGroq = groq`
*[_type == 'orderOfTopics'][0]{
  'topics': topics[]->{name}.name
}.topics
`;
