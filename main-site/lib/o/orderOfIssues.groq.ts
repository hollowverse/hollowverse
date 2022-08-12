import groq from 'groq';
import { orderOfIssuesProjection } from '~/lib/o/orderOfIssues.projection';

export const orderOfIssuesGroq = groq`*[_type == 'orderOfTopics'][0]{
  'issues': ${orderOfIssuesProjection}
}.issues`;
