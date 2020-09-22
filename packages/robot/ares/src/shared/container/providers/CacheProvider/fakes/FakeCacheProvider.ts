import cacheConfig from '@config/cache';

import ICacheInvalidateDTO from '../dtos/ICacheInvalidateDTO';
import ICacheInvalidatePrefixDTO from '../dtos/ICacheInvalidatePrefixDTO';
import ICacheProvider from '../models/ICacheProvider';

interface ICacheData {
  [key: string]: string;
}

class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData = {};

  public async save(
    key: string,
    value: any,
    withCacheKey?: boolean,
  ): Promise<void> {
    let setKey = key;

    if (withCacheKey) {
      setKey = `${cacheConfig.key}-${setKey}`;
    }

    this.cache[setKey] = JSON.stringify(value);
  }

  public async recover<T>(
    key: string,
    withCacheKey?: boolean,
  ): Promise<T | null> {
    let getKey = key;

    if (withCacheKey) {
      getKey = `${cacheConfig.key}-${getKey}`;
    }

    const data = this.cache[getKey];

    if (!data) return null;

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(data: ICacheInvalidateDTO): Promise<void> {
    let { keys } = data;

    if (data.withCacheKey) {
      keys = keys.map(key => `${cacheConfig.key}-${key}`);
    }

    keys.forEach(key => {
      delete this.cache[key];
    });
  }

  public async invalidatePrefix(
    data: ICacheInvalidatePrefixDTO,
  ): Promise<void> {
    const keys = Object.keys(this.cache).filter(key =>
      data.prefixes.some(prefix => {
        let findPrefix = prefix;

        if (data.withCacheKey) {
          findPrefix = `${cacheConfig.key}-${prefix}`;
        }

        return key.startsWith(findPrefix);
      }),
    );

    keys.forEach(key => {
      delete this.cache[key];
    });
  }
}

export default FakeCacheProvider;
