import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from '../dto/request/login-request.dto';
import { AuthPayloadResponseDto } from '../dto/response/auth-payload-response.dto';
import { EmployeeService } from '../../employee/service/employee.service';
import { comparePassword } from '../../../common/utils';
import { SessionService } from '../../session/service/session.service';
import { SessionEntity } from '../../session/entity/session.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService {

  constructor(private employeeService: EmployeeService, private sessionService: SessionService) {
  }

  async login(body: LoginRequestDto): Promise<AuthPayloadResponseDto> {
    console.log(body);
    let employee = await this.employeeService.findOneByEmail(body.email);
    if (!employee) {
      throw new BadRequestException('Invalid email');
    }
    const matchPassword = await comparePassword(employee.password, body.password);
    if (!matchPassword) throw new UnauthorizedException();
    let session: SessionEntity = await this.sessionService.findSession(employee.id);
    return plainToClass(AuthPayloadResponseDto, session, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    });
  }
}
