import groq from 'groq';
import { orderOfIssuesGroq } from '~/lib/o/orderOfIssues.groq';
import { OrderOfIssues } from '~/lib/o/orderOfIssues.projection';
import { sanityClient } from '~/shared/lib/sanityio';

export async function getOrderOfIssues() {
  return sanityClient.fetch<OrderOfIssues>(
    'order-of-issues',
    orderOfIssuesGroq,
  )!;
}
