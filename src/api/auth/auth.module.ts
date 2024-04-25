import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { EmployeeModule } from '../employee/employee.module';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [
    EmployeeModule,
    SessionModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {
}
