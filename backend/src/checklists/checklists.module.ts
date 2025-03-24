import { Module } from '@nestjs/common';
import { ChecklistsService } from './checklists.service';
import { ChecklistsController } from './checklists.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ChecklistsController],
  providers: [
    ChecklistsService,
    PrismaService,
    JwtService,
    UsersService,
    ConfigService,
  ],
})
export class ChecklistsModule {}
