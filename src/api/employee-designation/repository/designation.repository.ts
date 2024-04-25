import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { DesignationEntity } from '../entity/designation.entity';
import { EmployeeEntity } from '../../employee/entity/employee.entity';

@Injectable()
export class DesignationRepository extends Repository<DesignationEntity> {
  constructor(private dataSource: DataSource) {
    super(DesignationEntity, dataSource.manager);
  }
}
