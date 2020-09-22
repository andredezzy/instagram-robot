import ICacheInvalidateDTO from '../dtos/ICacheInvalidateDTO';
import ICacheInvalidatePrefixDTO from '../dtos/ICacheInvalidatePrefixDTO';

export default interface ICacheProvider {
  save(key: string, value: any, withCacheKey?: boolean): Promise<void>;
  recover<T>(key: string, withCacheKey?: boolean): Promise<T | null>;
  invalidate(data: ICacheInvalidateDTO): Promise<void>;
  invalidatePrefix(data: ICacheInvalidatePrefixDTO): Promise<void>;
}
