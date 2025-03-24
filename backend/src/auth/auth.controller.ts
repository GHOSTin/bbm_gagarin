import {
  Body,
  Controller,
  Post,
  HttpCode,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entities/auth.entity';
import { Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOkResponse({ type: AuthEntity })
  @HttpCode(200)
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  @HttpCode(200)
  login(
    @Body() LoginDto: LoginDto,
    @Res({ passthrough: true }) Response: Response,
  ) {
    return this.authService.login(LoginDto, Response);
  }

  //@UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('logout')
  @HttpCode(200)
  logout(@Request() req, @Res({ passthrough: true }) Response: Response) {
    if (req.user) {
      this.authService.logout(req.user?.['id'], Response);
    }
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  @ApiOkResponse({ type: AuthEntity })
  @HttpCode(200)
  refreshTokens(@Request() req) {
    const userId = req.user?.['sub'];
    const refreshToken = req.user?.['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken, {
      accessOnly: true,
    });
  }
}
