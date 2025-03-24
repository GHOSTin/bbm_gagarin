import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '@/users/users.service';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('refreshToken') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { refreshToken } = request.cookies;
    if (!refreshToken) {
      throw new ForbiddenException();
    }
    return true;
  }
}
