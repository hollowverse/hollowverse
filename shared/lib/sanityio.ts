import originalSanityClient from '@sanity/client';
import {
  FilteredResponseQueryOptions,
  SanityClient,
} from '@sanity/client/sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageObject } from '@sanity/image-url/lib/types/types';
import { log } from './log';

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

type SanityClientCreateParams = Parameters<
  typeof configuredSanityClient.create
>;

type SanityClientCorParams = Parameters<
  typeof configuredSanityClient.createOrReplace
>;

type SanityClientPatchParams = Parameters<typeof configuredSanityClient.patch>;

function createSanityClient(configuredSanityClient: SanityClient) {
  return {
    fetch: <T extends any>(
      requestName: string,
      query: string,
      params?: QueryParams,
      options?: FilteredResponseQueryOptions,
    ) => {
      log('debug', `sanity fetch: ${requestName}`, {
        requestName,
        ...(params ? { params } : undefined),
      });

      return configuredSanityClient.fetch(
        query,
        params,
        options as any,
      ) as T | null;
    },

    create<T extends Json>(
      requestName: string,
      ...args: SanityClientCreateParams
    ) {
      log('debug', `sanity create: ${requestName}`);

      return configuredSanityClient.create(...args) as unknown as Promise<T>;
    },

    createOrReplace<T extends Json>(
      requestName: string,
      ...args: SanityClientCorParams
    ) {
      log('debug', `sanity c.o.r.: ${requestName}`);

      return configuredSanityClient.createOrReplace(
        ...args,
      ) as unknown as Promise<T>;
    },

    patch(requestName: string, ...args: SanityClientPatchParams) {
      log('debug', `sanity patch: ${requestName}`);

      return configuredSanityClient.patch(...args);
    },
  };
}

export const sanityClientNoCdn = createSanityClient(
  configuredSanityClientNoCdn,
);
export const sanityClient = createSanityClient(configuredSanityClient);

const builder = imageUrlBuilder(configuredSanityClient);
export const sanityImage = (source: SanityImageObject) => builder.image(source);
