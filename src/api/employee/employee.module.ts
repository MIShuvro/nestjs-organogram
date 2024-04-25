import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './entity/employee.entity';
import { EmployeeController } from './controller/employee.controller';
import { EmployeeService } from './service/employee.service';
import { DesignationModule } from '../employee-designation/designation.module';
import { EmployeeRepository } from './repository/employee.repository';
import { RedisClientModule } from '../../common/redis-client/redis-client.module';
import { EmployeeTblSubscriber } from './subscribers/employee-tbl.subscriber';



@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity]), DesignationModule,RedisClientModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository,EmployeeTblSubscriber],
  exports: [EmployeeRepository, EmployeeService]
})

export class EmployeeModule {
}
