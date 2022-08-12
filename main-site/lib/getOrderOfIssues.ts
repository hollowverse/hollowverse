import groq from 'groq';
import { orderOfIssuesGroq } from '~/lib/orderOfIssues.groq';
import { OrderOfIssues } from '~/lib/orderOfIssues.projection';
import { sanityClient } from '~/shared/lib/sanityio';

export async function getOrderOfIssues() {
  return sanityClient.fetch<OrderOfIssues>(
    'order-of-issues',
    orderOfIssuesGroq,
  )!;
}
