import { Body, Controller, Get, HttpStatus, Injectable, Post, UseInterceptors } from '@nestjs/common';
import { DesignationService } from '../service/designation.service';
import { DesignationResponseDto } from '../dto/response/designation-response.dto';
import {
  BaseApiResponse,
  SwaggerBaseApiErrorResponse,
  SwaggerBaseApiResponse
} from '../../../common/dto/base-api-response.dto';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DesignationRequestDto } from '../dto/request/designation-request.dto';
import { ResponseInterceptor } from '../../../common/interceptors/response.interceptor';


@ApiTags('Employee Designation')
@Injectable()
@UseInterceptors(ResponseInterceptor)
@Controller({ version: '1', path: 'employee/designations' })
export class DesignationController {
  constructor(private readonly designationService: DesignationService) {
  }

  @Post()
  @ApiCreatedResponse({ type: SwaggerBaseApiResponse(DesignationResponseDto, HttpStatus.CREATED) })
  @ApiInternalServerErrorResponse({ type: SwaggerBaseApiErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR) })
  async create(@Body() body: DesignationRequestDto): Promise<BaseApiResponse<DesignationResponseDto>> {
    let data = await this.designationService.createDesignation(body);
    return {
      message: 'CREATED',
      data
    };
  }

  @Get()
  @ApiOkResponse({ type: SwaggerBaseApiResponse([DesignationResponseDto], HttpStatus.OK) })
  @ApiInternalServerErrorResponse({ type: SwaggerBaseApiErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR) })
  async find(): Promise<BaseApiResponse<DesignationResponseDto[]>> {
    let data = await this.designationService.findDesignations();
    return {
      message: 'OK',
      data
    };
  }
}
