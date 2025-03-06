import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [TestsController],
  providers: [TestsService, PrismaService, JwtService, UsersService, ConfigService],
})
export class TestsModule {}
