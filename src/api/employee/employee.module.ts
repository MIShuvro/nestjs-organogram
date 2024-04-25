import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './entity/employee.entity';
import { EmployeeController } from './controller/employee.controller';
import { DesignationService } from './service/designation.service';


@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity])],
  controllers: [EmployeeController],
  providers: [DesignationService],
  exports: []
})

export class DesignationModule {
}
