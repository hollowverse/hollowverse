import originalSanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageObject } from '@sanity/image-url/lib/types/types';
// import { log } from '~/lib/log';
import {
  SanityClient,
  FilteredResponseQueryOptions,
} from '@sanity/client/sanityClient';

const configuredSanityClient = originalSanityClient({
  projectId: 'ge8aosp3', // you can find this in sanity.json
  // dataset: 'staging',
  dataset: 'production',
  apiVersion: '2022-03-20',
  useCdn: true, // `false` if you want to ensure fresh data
});

type QueryParams = { [key: string]: any };

export const sanityClient = {
  fetch: (
    id: string,
    query: string,
    params?: QueryParams,
    options?: FilteredResponseQueryOptions,
  ) => {
    // log().info('Sanity fetch', {
    //   id,
    //   params: params || null,
    // });

    return configuredSanityClient.fetch(query, params, options as any);
  },
};

const builder = imageUrlBuilder(configuredSanityClient);
export const sanityImage = (source: SanityImageObject) => builder.image(source);
