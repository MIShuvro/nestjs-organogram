import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EmployeeEntity } from '../entity/employee.entity';
import { DesignationEntity } from '../../employee-designation/entity/designation.entity';
import { EmployeeResponseWithChildDto } from '../dto/response/employee-response.dto';

@Injectable()
export class EmployeeRepository extends Repository<EmployeeEntity> {
  constructor(private dataSource: DataSource) {
    super(EmployeeEntity, dataSource.manager);
  }

  async findEmployeeDetailsById(employee: EmployeeEntity): Promise<EmployeeEntity[]> {
    let parent: any = {
      id: employee.id
    };
    let data = await this.dataSource.manager.getTreeRepository(EmployeeEntity).findDescendantsTree(parent, {
      depth: 10,
      relations: ['designation']
    });
    return data.children;
  }
}
