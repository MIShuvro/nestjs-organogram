import {
  Body,
  Controller,
  HttpStatus,
  Injectable,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../../../common/interceptors/response.interceptor';
import { LoginRequestDto } from '../dto/request/login-request.dto';
import { AuthPayloadResponseDto } from '../dto/response/auth-payload-response.dto';
import { BaseApiResponse, SwaggerBaseApiResponse } from '../../../common/dto/base-api-response.dto';
import { EmployeeResponseDto, EmployeeResponseWithChildDto } from '../../employee/dto/response/employee-response.dto';
import { AuthService } from '../service/auth.service';

@ApiTags('Auth')
@Injectable()
@UseInterceptors(ResponseInterceptor)
@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({ type: SwaggerBaseApiResponse(AuthPayloadResponseDto, HttpStatus.OK) })
  async login(@Body() data: LoginRequestDto): Promise<BaseApiResponse<AuthPayloadResponseDto>> {
    let res = await this.authService.login(data);
    return {
      message: 'OK',
      data: res
    };
  }
}
