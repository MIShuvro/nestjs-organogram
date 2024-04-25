import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from '../../../common/utils';
import { SessionRepository } from '../repository/session.repository';
import { SessionEntity } from '../entity/session.entity';

@Injectable()
export class SessionService {

  constructor(private sessionRepository: SessionRepository, private readonly jwtService: JwtService) {
  }

  async getSession(subscriber: number): Promise<SessionEntity> {
    return this.sessionRepository.findOne({
      where: {
        subscriber
      }
    });
  }

  async findSession(subscriber: number):Promise<SessionEntity> {

    let session = await this.getSession(subscriber);


    if (!session) {
      session = await this.createSession(subscriber);

    }
    return session;
  }


  async createSession(subscriber: number): Promise<SessionEntity> {
    const token = await this.generateToken(subscriber);
    const data = { subscriber, token };
    return this.sessionRepository.save(data);
  }

  async generateToken(subscriber: number): Promise<string> {
    const payload: jwtPayload = {
      iss: process.env.APP_SECRET,
      subscriber
    };
    return this.jwtService.signAsync(payload);
  }


  async deleteSession(subscriber: number): Promise<boolean> {
    await this.sessionRepository.delete({ subscriber: subscriber });
    return true;
  }

}
