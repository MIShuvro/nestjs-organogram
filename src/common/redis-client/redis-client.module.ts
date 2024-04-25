import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisClientService } from './service/redis-service';

@Module({
  imports: [
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<RedisModuleOptions> => {
        return {
          config: {
            url: configService.get('REDIS_URL'),
            db: configService.get('REDIS_DB_INDEX'),
            keyPrefix: configService.get('REDIS_KEY_PREFIX'),
          },
        };
      },
    }),
  ],
  providers: [RedisClientService],
  exports: [RedisClientService],
})
export class RedisClientModule {}
