import { Injectable } from '@nestjs/common';
import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { EmployeeEntity } from '../entity/employee.entity';
import { RedisClientService } from '../../../common/redis-client/service/redis-service';
import { getPatternKey, getRedisDesignationKey } from '../../../common/utils/redis.util';
import * as process from 'process';

@Injectable()
@EventSubscriber()
export class EmployeeTblSubscriber implements EntitySubscriberInterface<EmployeeEntity> {
  constructor(private dataSource: DataSource, private redisClientService: RedisClientService) {
    this.dataSource.subscribers.push(this);
  }

  listenTo(): any {
    return EmployeeEntity;
  }

  async afterInsert(event: InsertEvent<EmployeeEntity>) {
    let keys = await this.redisClientService.getKeys(getPatternKey());
    for (const key of keys) {
      await this.redisClientService.delKey(key.split(process.env.REDIS_KEY_PREFIX)[1]);
    }
  }
}
