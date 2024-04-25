import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../repository/employee.repository';
import { EmployeeEntity } from '../entity/employee.entity';
import { DesignationRequestDto } from '../dto/request/designation-request.dto';
import { plainToClass } from 'class-transformer';
import { DesignationResponseDto } from '../dto/response/designation-response.dto';


@Injectable()
export class DesignationService {
  constructor(private readonly designationRepository: EmployeeRepository) {
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
}
