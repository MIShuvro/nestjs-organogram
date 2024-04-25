import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthServiceGuard implements CanActivate {
  constructor(private jwtService: JwtService) {
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    let request = context.switchToHttp().getRequest();
    let { authorization } = request.headers;
    if (!authorization) {
      throw new UnauthorizedException(`Authorization  required in header`);
    }
    if (authorization.startsWith('Bearer ')) {
      authorization = authorization.split(' ')[1];
    }
    try {
      let payload = this.jwtService.verify(authorization, { ignoreExpiration: true });
      delete payload?.iat;
      delete payload?.exp;
      delete payload?.iss;
      context.switchToHttp().getRequest().user = {
        id: payload.subscriber
      };
    } catch (error) {
      context.switchToHttp().getRequest().isError = true;
    }

    return true;
  }
}
