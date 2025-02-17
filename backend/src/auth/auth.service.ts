import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<AuthEntity> {
    // Check if user exists
    const userExists = await this.usersService.user(
      {email: createUserDto.email},
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const hash = await this.hashData(createUserDto.password);
    const newUser = await this.usersService.createUser({
      ...createUserDto,
      password: hash,
    });
    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return {
      accessToken: tokens.accessToken,
      user: new UserEntity(newUser)
    };
  }

  async login({ email, password }: LoginDto, response: Response): Promise<AuthEntity> {
    const user = await this.usersService.user({email: email});
    if(!user) {
      throw new NotFoundException(`Пользователя с email ${email} не существует`)
    }
    const isPasswordValid = await argon2.verify(user.password!, password);
    if(!isPasswordValid) {
      throw new UnauthorizedException('Не верный пароль')
    }
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken, response);

    return {
      accessToken: tokens.accessToken,
      user: new UserEntity(user)
    }
  }

  async logout(userId: number, response: Response): Promise<UserEntity> {
    response.clearCookie('refreshToken');
    return new UserEntity(await this.usersService.updateUser({where: {id: userId}, data: { refreshToken: null }}));
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async validateUser(email: string, password: string): Promise<any> {
    console.log(`[AuthService] validateUser: email=${email}, password=${password}`)
    return await this.usersService.validateUser(email, password);
  }

  async updateRefreshToken(userId: number, refreshToken: string, response?: Response) {
    if (response) {
      const { exp } = this.jwtService.verify(
        refreshToken,
        {secret: this.configService.get<string>('JWT_REFRESH_SECRET')}
      );
      response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: this.configService.get<string>('NODE_ENV') === 'production',
        expires: new Date(exp * 1000),
      });
    }
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.updateUser({where: {id: userId}, data: {
      refreshToken: hashedRefreshToken,
    }});
  }

  async refreshTokens(userId: number, refreshToken: string, options?: {response?: Response, accessOnly: boolean}): Promise<AuthEntity> {
    const user = await this.usersService.user({id: userId});
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Доступ запрещен');
    }
    const refreshTokensMatch = await argon2.verify(
      user.refreshToken,
      refreshToken
    );
    if (!refreshTokensMatch) throw new ForbiddenException('Доступ запрещен');
    const tokens = await this.getTokens(user.id, user.email);
    if(!options?.accessOnly) {
      await this.updateRefreshToken(user.id, tokens.refreshToken, options?.response);
    }
    return {
      accessToken: tokens.accessToken,
      user: new UserEntity(user)
    }
  }

  async getTokens(userId: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRE_TIME'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRE_TIME'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

}
