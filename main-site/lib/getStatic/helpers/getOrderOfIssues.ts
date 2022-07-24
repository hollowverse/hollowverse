import groq from 'groq';
import { orderOfIssuesGroq } from '~/lib/groq/orderOfIssues.groq';
import { OrderOfIssues } from '~/lib/groq/orderOfIssues.projection';
import { sanityClient } from '~/shared/lib/sanityio';

export async function getOrderOfIssues() {
  return sanityClient.fetch<OrderOfIssues>(
    'order-of-issues',
    orderOfIssuesGroq,
  )!;
}
