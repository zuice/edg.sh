import { createClient, RedisClient, Multi } from 'redis';
import { promisifyAll } from 'bluebird';

promisifyAll(RedisClient.prototype);
promisifyAll(Multi.prototype);

declare module 'redis' {
  export interface RedisClient extends NodeJS.EventEmitter {
    getAsync(key: string): Promise<string>;
    setAsync(key: string, value: string): Promise<boolean>;
    existsAsync(key: string): Promise<boolean>;
    // add other methods here
  }
}

export const redis = createClient({ url: process.env.REDIS_URL });
