import 'dotenv/config';

import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';
  key: string;

  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: 'redis',
  key: process.env.REDIS_DEFAULT_CACHE_KEY,

  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD || undefined,
    },
  },
} as ICacheConfig;
