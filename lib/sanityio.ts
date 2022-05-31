import sanityClient_ from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageObject } from '@sanity/image-url/lib/types/types';

export const sanityClient = sanityClient_({
  projectId: 'ge8aosp3', // you can find this in sanity.json
  // dataset: 'staging',
  dataset: 'production',
  apiVersion: '2022-03-20',
  useCdn: true, // `false` if you want to ensure fresh data
});

const builder = imageUrlBuilder(sanityClient);
export const sanityImage = (source: SanityImageObject) => builder.image(source);
