import originalSanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageObject } from '@sanity/image-url/lib/types/types';
import { log, loggerStringify } from './log';
import {
  SanityClient,
  FilteredResponseQueryOptions,
} from '@sanity/client/sanityClient';

const sanityClientConfigs = {
  projectId: 'ge8aosp3', // you can find this in sanity.json
  dataset: 'staging',
  // dataset: 'production',
  apiVersion: '2022-03-20',
};

const configuredSanityClient = originalSanityClient({
  ...sanityClientConfigs,
  useCdn: true, // `false` if you want to ensure fresh data
});

const configuredSanityClientNoCdn = originalSanityClient({
  ...sanityClientConfigs,
  useCdn: false,
});

type QueryParams = { [key: string]: any };

function createSanityClient(sanityClient: SanityClient) {
  return {
    fetch: (
      id: string,
      query: string,
      params?: QueryParams,
      options?: FilteredResponseQueryOptions,
    ) => {
      log('info', 'sanity fetch', [
        id,
        params ? loggerStringify(params) : undefined,
      ]);

      return sanityClient.fetch(query, params, options as any);
    },
  };
}

export const sanityClientNoCdn = createSanityClient(
  configuredSanityClientNoCdn,
);
export const sanityClient = createSanityClient(configuredSanityClient);

const builder = imageUrlBuilder(configuredSanityClient);
export const sanityImage = (source: SanityImageObject) => builder.image(source);
