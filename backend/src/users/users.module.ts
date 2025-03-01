import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { UsersController } from './users.controller';
import { ProfilesModule } from '@/profiles/profiles.module';
import { ProfilesService } from '@/profiles/profiles.service';

@Module({
  imports: [PrismaModule, ProfilesModule],
  providers: [UsersService, ProfilesService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
