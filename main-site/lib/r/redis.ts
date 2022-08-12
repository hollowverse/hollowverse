import { Redis } from '@upstash/redis';
import { Json } from '~/shared/lib/types';

const redis_ = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
});

type GetParams = Parameters<typeof redis_.get>;
type SetParams = Parameters<typeof redis_.set>;

export const redis = {
  async get<T extends Json>(...args: GetParams) {
    const data = await redis_.get<T>(...args);

    return data;
  },

  async set(key: string, val: Json, options?: SetParams[2]) {
    await redis_.set(key, JSON.stringify(val), options);
  },
};
