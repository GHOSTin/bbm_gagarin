import { Module } from '@nestjs/common';
import { ProfTestsService } from './prof-tests.service';
import { ProfTestsController } from './prof-tests.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ProfTestsController],
  providers: [
    ProfTestsService,
    PrismaService,
    JwtService,
    UsersService,
    ConfigService,
  ],
})
export class ProfTestsModule {}
