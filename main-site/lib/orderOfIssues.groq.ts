import groq from 'groq';
import { orderOfIssuesProjection } from '~/lib/orderOfIssues.projection';

export const orderOfIssuesGroq = groq`*[_type == 'orderOfTopics'][0]{
  'issues': ${orderOfIssuesProjection}
}.issues`;
