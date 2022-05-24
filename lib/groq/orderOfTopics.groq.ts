import groq from 'groq';

export type OrderOfTopicsGroqResponse = string[];

export const orderOfTopicsGroq = groq`
*[_type == 'orderOfTopics'][0]{
  'topics': topics[]->{name}.name
}.topics
`;
