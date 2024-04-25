import { Module } from '@nestjs/common';
import { AppController } from './index/app.controller';
import { DesignationModule } from './employee-designation/designation.module';
import { DatabaseModule } from '../common/database/database.module';
import { EmployeeModule } from './employee/employee.module';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisClientModule } from '../common/redis-client/redis-client.module';
import { LoggerModule } from '../common/logger/logger.module';

@Module({
  imports: [{
    ...JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('APP_SECRET')
        // signOptions: {
        //   issuer: AppConfigService.appConfig.JWT_ISSUER
        // },
        // verifyOptions: {
        //   issuer: AppConfigService.appConfig.JWT_ISSUER
        // }
      })
    }),
    global: true
  }, AuthModule, SessionModule, DatabaseModule, DesignationModule, EmployeeModule,RedisClientModule,LoggerModule],
  controllers: [AppController],
  providers: []
})
export class ApiModule {
}
