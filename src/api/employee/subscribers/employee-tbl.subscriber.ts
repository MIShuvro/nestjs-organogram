import { Injectable } from '@nestjs/common';
import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { EmployeeEntity } from '../entity/employee.entity';
import { RedisClientService } from '../../../common/redis-client/service/redis-service';
import { getRedisDesignationKey } from '../../../common/utils/redis.util';

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
    await this.redisClientService.delKey(getRedisDesignationKey());

  }
}
