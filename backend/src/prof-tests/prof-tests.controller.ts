import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, ParseIntPipe } from '@nestjs/common';
import { ProfTestsService } from './prof-tests.service';
import { CreateProfTestDto } from './dto/create-prof-test.dto';
import { UpdateProfTestDto } from './dto/update-prof-test.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateProfTestUsersDto } from '@/prof-tests/dto/update-prof-test-users.dto';

@Controller('prof-tests')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProfTestsController {
  constructor(private readonly profTestsService: ProfTestsService) {}

  @Get()
  @HttpCode(200)
  findAll() {
    return this.profTestsService.findAll({where: {active: true}});
  }

  @Get('user/:id')
  @HttpCode(200)
  findByUser(@Param('id', ParseIntPipe) id: number) {
    return this.profTestsService.findAll({
      where: {
        users: {
          some: {id}
        },
        checkLists: {
          none: {
            userId: id
          }
        }
      }
    });
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.profTestsService.findOne({id});
  }

  @Patch('users')
  @HttpCode(200)
  updateUsers(@Body() updateProfTestUsersDto: UpdateProfTestUsersDto) {
    const {usersId, profTestsId} = updateProfTestUsersDto;
    const users = usersId.map((userId)=> ({id: userId}))
    return this.profTestsService.updateMany({where: profTestsId, data: users})
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateProfTestDto: UpdateProfTestDto) {
    return this.profTestsService.update({where: {id}, data: updateProfTestDto});
  }
}
