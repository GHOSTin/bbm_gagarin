import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { UsersService } from '@/users/users.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProfilesController],
  providers: [ProfilesService, UsersService],
})
export class ProfilesModule {}
