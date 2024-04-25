import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { SessionEntity } from '../entity/session.entity';

@Injectable()
export class SessionRepository extends Repository<SessionEntity> {
  constructor(private dataSource: DataSource) {
    super(DesignationEntity, dataSource.manager);
  }
}
