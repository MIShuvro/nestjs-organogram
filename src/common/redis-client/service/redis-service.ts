import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisClientService {
  constructor(@InjectRedis() private readonly redisClient: Redis) {}

  async addSortedSetMember(key: string, score, identifire: string) {
    await this.redisClient.zadd(key, score, identifire);
  }

  async incrementSortedSetMember(key: string, score: number, identifire: string) {
    await this.redisClient.zincrby(key, score, identifire);
  }

  async getAllSortedSetMembersWithScore(key: string) {
    return this.redisClient.zrangebyscore(key, '-inf', '+inf', 'WITHSCORES');
  }

  async setKeyExpiry(key: string, expInSec: number) {
    let ttlVal = await this.redisClient.ttl(key);
    if (ttlVal === -1) {
      return this.redisClient.expire(key, expInSec);
    }
    return ttlVal;
  }
}
