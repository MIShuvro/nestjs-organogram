import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeRepository } from '../repository/employee.repository';
import { EmployeeRequestDto } from '../dto/request/employee-request.dto';
import { plainToClass } from 'class-transformer';
import { EmployeeResponseDto, EmployeeResponseWithChildDto } from '../dto/response/employee-response.dto';
import { DesignationRepository } from '../../employee-designation/repository/designation.repository';
import { DesignationService } from '../../employee-designation/service/designation.service';
import { EmployeeEntity } from '../entity/employee.entity';
import { raw } from 'express';
import { DESIGNATION_IDENTIFIER } from '../../../common/constants';
import { DesignationEntity } from '../../employee-designation/entity/designation.entity';
import { hashPassword } from '../../../common/utils';
import { getRedisDesignationKey } from '../../../common/utils/redis.util';
import { RedisClientService } from '../../../common/redis-client/service/redis-service';
import { MyLogger } from '../../../common/logger/service/logger.service';


@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository,
              private designationService: DesignationService,
              private redisClient: RedisClientService,
              private loggerService: MyLogger) {
  }


  async getParentEmployeeById(body: EmployeeRequestDto, designation: DesignationEntity): Promise<EmployeeEntity> {
    let employee: EmployeeEntity = null;
    if (body.parent_employee_id) {
      employee = await this.employeeRepository.findOne({
        where: { id: body.parent_employee_id },
        relations: ['designation']
      });
    }
    return employee;
  }


  async validateParentEmployee(designation: DesignationEntity, parentEmployee: EmployeeEntity) {
    if (designation.identifier === DESIGNATION_IDENTIFIER.CTO) {
      if (parentEmployee) {
        throw new BadRequestException('Do not need to parent id for cto');
      }
      let hasCtoEmployee = await this.employeeRepository.findOne({
        where: {
          designation_id: designation.id
        }
      });
      if (hasCtoEmployee) {
        throw new BadRequestException('Already has a cto');
      }
    }
    if (designation.identifier === DESIGNATION_IDENTIFIER.SENIOR_SOFTWARE_ENGINEER && parentEmployee?.designation.identifier != DESIGNATION_IDENTIFIER.CTO) {
      throw new BadRequestException('Need a cto employee id as a parent employee id');
    }

    if (designation.identifier === DESIGNATION_IDENTIFIER.SOFTWARE_ENGINEER && parentEmployee?.designation.identifier != DESIGNATION_IDENTIFIER.SENIOR_SOFTWARE_ENGINEER) {
      throw new BadRequestException(`Need a ${DESIGNATION_IDENTIFIER.SENIOR_SOFTWARE_ENGINEER} employee id as a parent employee id`);
    }

    if (designation.identifier === DESIGNATION_IDENTIFIER.JUNIOR_SOFTWARE_ENGINEER && parentEmployee?.designation.identifier != DESIGNATION_IDENTIFIER.SOFTWARE_ENGINEER) {
      throw new BadRequestException(`Need a ${DESIGNATION_IDENTIFIER.SOFTWARE_ENGINEER} employee id as a parent employee id`);
    }
  }

  async createEmployee(body: EmployeeRequestDto): Promise<EmployeeResponseDto> {
    let designation = await this.designationService.findOneDesignationById(body.designation_id);
    if (!designation) {
      throw new NotFoundException('Designation not found');
    }

    let parentEmployee = await this.getParentEmployeeById(body, designation);
    await this.validateParentEmployee(designation, parentEmployee);
    let newEmployee = await this.employeeRepository.save({
      name: body.name,
      password: hashPassword(body.password),
      email: body.email,
      designation,
      parent: parentEmployee
    });
    return plainToClass(EmployeeResponseDto, newEmployee, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    });

  }

  async getEmployeeInfoFromRedis(key: string): Promise<EmployeeResponseWithChildDto[]> {
    this.loggerService.log('Employee Info comes from the cache');
    let cacheValue: EmployeeEntity[] = JSON.parse(await this.redisClient.getValue(key));
    return plainToClass(EmployeeResponseWithChildDto, cacheValue, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    });
  }

  async setValueToRedis(key: string, employees: EmployeeEntity[]) {
    this.loggerService.log('Employee Info comes from db');
    await this.redisClient.setValueWithExpireInSec(key, JSON.stringify(employees), 24 * 60 * 60);
  }

  async findEmployeeDetails(id: number): Promise<EmployeeResponseWithChildDto[]> {
    let designation = await this.designationService.findOneDesignationById(id);
    if (!designation) {
      throw new NotFoundException('Designation not found');
    }

    let employee = await this.employeeRepository.findOne({
      where: { designation_id: designation.id }
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    let redisKey = getRedisDesignationKey();
    let isKeyExists = await this.redisClient.checkKeyExist(redisKey);
    if (isKeyExists) {
      return this.getEmployeeInfoFromRedis(redisKey);
    }

    let children = await this.employeeRepository.findEmployeeDetailsById(employee);
    await this.setValueToRedis(redisKey, children);
    return plainToClass(EmployeeResponseWithChildDto, children, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    });
  }

  async findOneByEmail(email: string): Promise<EmployeeEntity> {
    return this.employeeRepository.findOne({
      where: {
        email
      }
    });
  }
}
