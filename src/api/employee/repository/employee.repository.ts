import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EmployeeEntity } from '../entity/employee.entity';

@Injectable()
export class DesignationRepository extends Repository<EmployeeEntity> {
  constructor(private dataSource: DataSource) {
    super(EmployeeEntity, dataSource.manager);
  }
}
