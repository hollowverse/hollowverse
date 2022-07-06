import { Summaries } from '~/lib/getStatic/helpers/getParsedOldContent';
import { Picture } from '~/lib/groq/picture.projection';

export type TrendingCelebs = {
  name: string;
  slug: string;
  picture: Picture;
  summaries: Summaries;
}[];

export async function getTrendingIssues() {}
