import groq from 'groq';

export type OrderOfIssues = string[];

export const orderOfIssuesProjection = groq`topics[]->{name}.name`;
