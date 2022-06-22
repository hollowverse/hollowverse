import originalSanityClient from '@sanity/client';
import {
  FilteredResponseQueryOptions,
  SanityClient,
} from '@sanity/client/sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageObject } from '@sanity/image-url/lib/types/types';
import { logger } from './log';

const sanityClientConfigs = {
  projectId: 'ge8aosp3', // you can find this in sanity.json

  // Remember to change this in sanity.json as well
  // dataset: 'staging',
  dataset: 'production',

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
    fetch: <T extends any>(
      requestName: string,
      query: string,
      params?: QueryParams,
      options?: FilteredResponseQueryOptions,
    ) => {
      logger.debug(
        {
          requestName,
          debugInfo: params ? { params } : undefined,
        },
        `sanity fetch: ${requestName}`,
      );

      return sanityClient.fetch(query, params, options as any) as T | null;
    },
  };
}

export const sanityClientNoCdn = createSanityClient(
  configuredSanityClientNoCdn,
);
export const sanityClient = createSanityClient(configuredSanityClient);

const builder = imageUrlBuilder(configuredSanityClient);
export const sanityImage = (source: SanityImageObject) => builder.image(source);
