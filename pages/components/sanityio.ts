import sanityClient_ from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = sanityClient_({
  projectId: 'ge8aosp3', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  apiVersion: '2022-03-20',
  useCdn: true, // `false` if you want to ensure fresh data
});

const builder = imageUrlBuilder(sanityClient);
export const sanityImage = (source: string) => builder.image(source);
