import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppCacheManager {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get<T>(key: string): Promise<T | undefined> {
    return this.cache.get<T>(key);
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    return this.cache.set(key, value, ttl);
  }

  async del(key: string): Promise<void> {
    return this.cache.del(key);
  }

  reset(): Promise<void> {
    return this.cache.reset();
  }
}
