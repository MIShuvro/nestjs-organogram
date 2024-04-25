import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { SessionTokenDto } from 'src/api/liveclass/dto/session-token.dto';
import { AdminUserAuthService } from '@common/auth/service/admin-user-auth.service';
import { AuthServiceAdminUserDto } from '@common/auth/dto/admin-user.dto';
import { StateResDto } from '../../api/liveclass/dto/res/state-res.dto';

@Injectable()
export class StateTokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    let request = context.switchToHttp().getRequest<Request>();
    let stateToken: string = request.query?.token as string;
    if (!stateToken) {
      context.switchToHttp().getRequest().isError = true;
      return true;
    }
    if (stateToken.startsWith('Bearer ')) {
      stateToken = stateToken.split(' ')[1];
    }
    // if json verify fails, then check auth service validate token
    try {
      let state_token_data = this.jwtService.verify(stateToken, { ignoreExpiration: true });
      delete state_token_data?.iat;
      delete state_token_data?.exp;
      delete state_token_data?.iss;
      context.switchToHttp().getRequest().state_token_data = state_token_data;
    } catch (error) {
      console.log('error=====', error);
      context.switchToHttp().getRequest().isError = true;
    }

    return true;
  }
}
