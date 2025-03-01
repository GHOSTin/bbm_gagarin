import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Roles } from '@/roles/roles.decorator';
import { Role } from '@/roles/roles.enum';
import { RolesGuard } from '@/roles/guards/roles.guard';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { ProfileEntity } from '@/profiles/entities/profile.entity';

@UseGuards(JwtAuthGuard)
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @ApiBearerAuth()
  @Post()
  @Roles(Role.ADMIN, Role.MODERATOR)
  @UseGuards(RolesGuard)
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.createProfile(createProfileDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({isArray: true, type: ProfileEntity})
  @Get()
  @Roles(Role.ADMIN, Role.MODERATOR)
  @UseGuards(RolesGuard)
  findAll() {
    return this.profilesService.profiles({});
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({type: ProfileEntity})
  findOne(@Param('id') id: string) {
    return this.profilesService.profile({ id });
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.updateProfile({where: { id }, data: updateProfileDto});
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.profilesService.removeProfile({ id });
  }
}
