import { Module } from '@nestjs/common';
import { SessionService } from './service/session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from './entity/session.entity';
import { SessionRepository } from './repository/session.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity])],
  controllers: [],
  providers: [SessionService, SessionRepository],
  exports: [SessionService]
})
export class SessionModule {
}
