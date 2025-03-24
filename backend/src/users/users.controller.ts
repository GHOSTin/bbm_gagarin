import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/roles/guards/roles.guard';
import { Roles } from '@/roles/roles.decorator';
import { Role } from '@/roles/roles.enum';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@ApiTags('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOkResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      profile: {
        create: {
          firstName: '',
          lastName: '',
        },
      },
    };
    return new UserEntity(await this.usersService.createUser(user));
  }

  @ApiBearerAuth()
  @Get()
  @Roles(Role.ADMIN, Role.MODERATOR)
  @UseGuards(RolesGuard)
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    const users = await this.usersService.users({});
    return users.map((user) => new UserEntity(user));
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.usersService.user({ id: id }));
  }

  @ApiBearerAuth()
  // @Roles(Role.ADMIN, Role.MODERATOR)
  // @UseGuards(RolesGuard)
  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const data = {
      name: updateUserDto.name,
      profile: {
        update: {
          ...updateUserDto.profile,
        },
      },
    };
    return new UserEntity(
      await this.usersService.updateUser({
        where: { id: id },
        data: { ...data, updatedAt: new Date(Date.now()) },
      }),
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.usersService.deleteUser({ id: id }));
  }
}
