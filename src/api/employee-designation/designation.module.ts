import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesignationEntity } from './entity/designation.entity';
import { DesignationController } from './controller/designation.controller';
import { DesignationService } from './service/designation.service';
import { DesignationRepository } from './repository/designation.repository';
import { EmployeeModule } from '../employee/employee.module';
import { LoggerModule } from '../../common/logger/logger.module';


@Module({
  imports: [TypeOrmModule.forFeature([DesignationEntity]), LoggerModule],
  controllers: [DesignationController],
  providers: [DesignationService, DesignationRepository],
  exports: [DesignationService,DesignationRepository]
})

export class DesignationModule {
}
