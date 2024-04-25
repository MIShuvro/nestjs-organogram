import { Body, Controller, Get, HttpStatus, Injectable, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { EmployeeService } from '../service/employee.service';
import { EmployeeResponseDto, EmployeeResponseWithChildDto } from '../dto/response/employee-response.dto';
import {
  BaseApiResponse,
  SwaggerBaseApiErrorResponse,
  SwaggerBaseApiResponse
} from '../../../common/dto/base-api-response.dto';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags
} from '@nestjs/swagger';
import { EmployeeRequestDto } from '../dto/request/employee-request.dto';
import { ResponseInterceptor } from '../../../common/interceptors/response.interceptor';
import { AuthServiceGuard } from '../../../common/guard/auth.guard';


@ApiTags('Employee')
@Injectable()
@UseInterceptors(ResponseInterceptor)
@Controller({ version: '1', path: 'employees' })
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {
  }

  @Post()
  @ApiCreatedResponse({ type: SwaggerBaseApiResponse(EmployeeResponseDto, HttpStatus.CREATED) })
  @ApiInternalServerErrorResponse({ type: SwaggerBaseApiErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR) })
  async create(@Body() body: EmployeeRequestDto): Promise<BaseApiResponse<EmployeeResponseDto>> {
    let data = await this.employeeService.createEmployee(body);
    return {
      message: 'CREATED',
      data
    };
  }

  @Get('designations/:id/employee-details')
  @ApiOkResponse({ type: SwaggerBaseApiResponse([EmployeeResponseWithChildDto], HttpStatus.OK) })
  @ApiInternalServerErrorResponse({ type: SwaggerBaseApiErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR) })
  async findEmployeeByPosition(@Param('id') id: number): Promise<BaseApiResponse<EmployeeResponseWithChildDto[]>> {
    let data = await this.employeeService.findEmployeeDetails(id);
    return {
      message: 'OK',
      data
    };
  }

  @Get('designations/:id/employee-details/jwt')
  @UseGuards(AuthServiceGuard)
  @ApiSecurity('auth')
  @ApiOkResponse({ type: SwaggerBaseApiResponse([EmployeeResponseWithChildDto], HttpStatus.OK) })
  @ApiInternalServerErrorResponse({ type: SwaggerBaseApiErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR) })
  async findEmployeeByPositionWithAuthorization(@Param('id') id: number): Promise<BaseApiResponse<EmployeeResponseWithChildDto[]>> {
    let data = await this.employeeService.findEmployeeDetails(id);
    return {
      message: 'OK',
      data
    };
  }
}
