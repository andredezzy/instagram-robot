import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@config/cache';

import ICacheInvalidateDTO from '../dtos/ICacheInvalidateDTO';
import ICacheInvalidatePrefixDTO from '../dtos/ICacheInvalidatePrefixDTO';
import ICacheProvider from '../models/ICacheProvider';

class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(
    key: string,
    value: any,
    withCacheKey?: boolean,
  ): Promise<void> {
    let setKey = key;

    if (withCacheKey) {
      setKey = `${cacheConfig.key}-${setKey}`;
    }

    await this.client.set(setKey, JSON.stringify(value));
  }

  public async recover<T>(
    key: string,
    withCacheKey?: boolean,
  ): Promise<T | null> {
    let getKey = key;

    if (withCacheKey) {
      getKey = `${cacheConfig.key}-${getKey}`;
    }

    const data = await this.client.get(getKey);

    if (!data) return null;

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(data: ICacheInvalidateDTO): Promise<void> {
    let { keys } = data;

    if (data.withCacheKey) {
      keys = keys.map(key => `${cacheConfig.key}-${key}`);
    }

    await this.client.del(keys);
  }

  public async invalidatePrefix(
    data: ICacheInvalidatePrefixDTO,
  ): Promise<void> {
    const keys: string[] = [];

    for (const prefix of data.prefixes) {
      let findKeys = await this.client.keys(`${prefix}*`);

      if (data.withCacheKey) {
        findKeys = await this.client.keys(`${cacheConfig.key}-${prefix}*`);
      }

      keys.push(...findKeys);
    }

    const pipeline = this.client.pipeline();

    keys.forEach(key => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}

export default RedisCacheProvider;
