import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DesignationRepository } from '../repository/designation.repository';
import { DesignationEntity } from '../entity/designation.entity';
import { DesignationRequestDto } from '../dto/request/designation-request.dto';
import { plainToClass } from 'class-transformer';
import { DesignationResponseDto } from '../dto/response/designation-response.dto';
import { DESIGNATION_IDENTIFIER } from '../../../common/constants';
import { EmployeeResponseWithChildDto } from '../../employee/dto/response/employee-response.dto';

// @ts-ignore
import { dataSource } from 'ormconfig';
import { EmployeeEntity } from '../../employee/entity/employee.entity';
import { EmployeeRepository } from '../../employee/repository/employee.repository';
import { MyLogger } from '../../../common/logger/service/logger.service';

@Injectable()
export class DesignationService {
  constructor(private readonly designationRepository: DesignationRepository) {
  }


  async createDesignation(body: DesignationRequestDto): Promise<DesignationResponseDto> {
    let designation = await this.designationRepository.save(body);

    return plainToClass(DesignationResponseDto, designation, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    });
  }

  async findDesignations(): Promise<DesignationResponseDto[]> {
    let designations = await this.designationRepository.find();
    return plainToClass(DesignationResponseDto, designations, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    });
  }

  async findOneDesignationById(id: number): Promise<DesignationEntity> {
    return this.designationRepository.findOne({ where: { id } });
  }
}
